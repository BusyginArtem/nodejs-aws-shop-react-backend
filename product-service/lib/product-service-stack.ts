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
    new cdk.CfnOutput(this, "path", { value: path.join(__dirname, "../resources/handlers") });

    const getProductsLambda = new lambda.Function(this, "get-products-lambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "getProductList.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../resources/handlers")
      ),
    });

    const getProductLambda = new lambda.Function(this, "get-product-lambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "getProductById.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../resources/handlers")
      ),
    });

    // 👇 add /products resources
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
