import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamoDB from "aws-cdk-lib/aws-dynamodb";
// import * as dotenv from "dotenv";
import * as path from "path";

// dotenv.config();

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const productsTable = dynamoDB.Table.fromTableArn(
      this,
      "Products",
      "arn:aws:dynamodb:eu-west-1:340814386691:table/Products"
    );

    const stocksTable = dynamoDB.Table.fromTableArn(
      this,
      "Stocks",
      "arn:aws:dynamodb:eu-west-1:340814386691:table/Stocks"
    );

    const api = new apiGateway.RestApi(this, "ProductApi", {
      restApiName: "Product Service",
      deployOptions: {
        stageName: "dev",
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: ["*"],
      },
    });

    new cdk.CfnOutput(this, "apiUrl", { value: api.url });

    // Lambda layers
    const dbLayer = new lambda.LayerVersion(this, "db-layer", {
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "layers", "db")
      ),
      description: "dynamo-db",
      license: "Apache-2.0",
      compatibleRuntimes: [
        lambda.Runtime.NODEJS_16_X,
        lambda.Runtime.NODEJS_18_X,
      ],
    });

    // To grant usage by other AWS accounts
    dbLayer.addPermission("remote-account-grant", {
      accountId: "*",
    });

    const utilsLayer = new lambda.LayerVersion(this, "utils-layer", {
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "layers", "utils")
      ),
      description: "utils",
      license: "Apache-2.0",
      compatibleRuntimes: [
        lambda.Runtime.NODEJS_16_X,
        lambda.Runtime.NODEJS_18_X,
      ],
    });

    // To grant usage by other AWS accounts
    utilsLayer.addPermission("remote-account-grant", {
      accountId: "*",
    });

    // Lambdas
    const getProductsLambda = new lambda.Function(this, "get-products-lambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "getProductList.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "lambdas")
      ),
      environment: {
        PRODUCTS_TABLE: "Products",
        STOCKS_TABLE: "Stocks",
      },
      layers: [dbLayer, utilsLayer],
    });

    const getProductLambda = new lambda.Function(this, "get-product-lambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "getProductById.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "lambdas")
      ),
      environment: {
        PRODUCTS_TABLE: "Products",
        STOCKS_TABLE: "Stocks",
      },
      layers: [dbLayer, utilsLayer],
    });

    const createProductLambda = new lambda.Function(
      this,
      "create-product-lambda",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "createProduct.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "..", "resources", "lambdas")
        ),
        environment: {
          PRODUCTS_TABLE: "Products",
          STOCKS_TABLE: "Stocks",
        },
        layers: [dbLayer, utilsLayer],
      }
    );

    // Routes
    // 👇 add /products and /products/:id resources
    const products = api.root.addResource("products");
    const product = products.addResource("{productId}");

    // 👇 integrate GET /products with getProductsLambda
    products.addMethod(
      "GET",
      new apiGateway.LambdaIntegration(getProductsLambda, { proxy: true })
    );

    // 👇 integrate GET /product/:productId with getProductLambda
    product.addMethod(
      "GET",
      new apiGateway.LambdaIntegration(getProductLambda, { proxy: true })
    );

    // 👇 integrate POST /products with createProductLambda
    products.addMethod(
      "POST",
      new apiGateway.LambdaIntegration(createProductLambda, { proxy: true })
    );

    // db grant access
    productsTable.grantReadData(getProductsLambda);
    productsTable.grantReadData(getProductLambda);
    productsTable.grantReadWriteData(createProductLambda);
    stocksTable.grantReadData(getProductsLambda);
    stocksTable.grantReadData(getProductLambda);
    stocksTable.grantReadWriteData(createProductLambda);
  }
}
