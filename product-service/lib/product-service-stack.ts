import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
// import * as dotenv from "dotenv";
import * as path from "path";

// dotenv.config();

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apiGateway.RestApi(this, "ProductApi", {
      restApiName: "Product Service",
      deployOptions: {
        stageName: "dev",
      },
      defaultCorsPreflightOptions: {
        // allowHeaders: ["*"],
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
    // const productDataLayer = new lambda.LayerVersion(
    //   this,
    //   "product-data-layer",
    //   {
    //     code: lambda.Code.fromAsset(path.join(__dirname, "..", "resources", "layers", "mock")),
    //     description: "mocked-products",
    //     compatibleRuntimes: [lambda.Runtime.NODEJS_18_X],
    //   }
    // );

    // const utilsLayer = new lambda.LayerVersion(this, "utils-layer", {
    //   code: lambda.Code.fromAsset(path.join(__dirname, "..", "resources", "layers", "utils")),
    //   description: "utils",
    //   compatibleRuntimes: [lambda.Runtime.NODEJS_18_X],
    // });

    // Lambdas
    const getProductsLambda = new lambda.Function(this, "get-products-lambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "getProductList.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "lambdas")
      ),
      // layers: [productDataLayer, utilsLayer],
    });

    const getProductLambda = new lambda.Function(this, "get-product-lambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "getProductById.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "lambdas")
      ),
      // layers: [productDataLayer, utilsLayer],
    });

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
  }
}