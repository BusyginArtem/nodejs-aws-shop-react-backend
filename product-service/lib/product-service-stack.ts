import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamoDB from "aws-cdk-lib/aws-dynamodb";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as sns from "aws-cdk-lib/aws-sns";
import * as dotenv from "dotenv";
import * as path from "path";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

dotenv.config();

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const productsTable = dynamoDB.Table.fromTableArn(
      this,
      process.env.PRODUCTS_TABLE!,
      process.env.PRODUCTS_TABLE_ARN!,
    );

    const stocksTable = dynamoDB.Table.fromTableArn(
      this,
      process.env.STOCKS_TABLE!,
      process.env.STOCKS_TABLE_ARN!,
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

    const importProductTopic = new sns.Topic(this, "ImportProductTopic", {
      topicName: "ImportProductTopic",
    });

    const importQueue = new sqs.Queue(this, "CatalogItemsQueue", {
      queueName: "CatalogItemsQueue",
      retentionPeriod: cdk.Duration.hours(1),
      receiveMessageWaitTime: cdk.Duration.seconds(20),
      visibilityTimeout: cdk.Duration.seconds(30),
    });

    new cdk.CfnOutput(this, "apiUrl", { value: api.url });

    // Lambda layers
    const dbLayer = new lambda.LayerVersion(this, "DBLayer", {
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

    const utilsLayer = new lambda.LayerVersion(this, "UtilsLayer", {
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

    const lambdaProps = {
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        minify: false,
        externalModules: ["aws-sdk"],
      },
      layers: [utilsLayer, dbLayer],
    };

    // Lambdas
    const getProductsLambda = new lambda.Function(this, "GetProductsLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "getProductList.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "lambdas")
      ),
      environment: {
        PRODUCTS_TABLE: process.env.PRODUCTS_TABLE!,
        STOCKS_TABLE: process.env.STOCKS!,
      },
      layers: [dbLayer, utilsLayer],
    });

    const getProductLambda = new lambda.Function(this, "GetProductLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "getProductById.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "lambdas")
      ),
      environment: {
        PRODUCTS_TABLE: process.env.PRODUCTS_TABLE!,
        STOCKS_TABLE: process.env.STOCKS!,
      },
      layers: [dbLayer, utilsLayer],
    });

    const createProductLambda = new lambda.Function(
      this,
      "CreateProductlambda",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "createProduct.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "..", "resources", "lambdas")
        ),
        environment: {
          PRODUCTS_TABLE: process.env.PRODUCTS_TABLE!,
          STOCKS_TABLE: process.env.STOCKS!,
        },
        layers: [dbLayer, utilsLayer],
      }
    );

    const catalogBatchProcessLambda = new lambda.Function(
      this,
      "CatalogBatchProcessLambda",
      {
        handler: "catalogBatchProcess.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "..", "resources", "lambdas")
        ),
        environment: {
          SNS_TOPIC_ARN: importProductTopic.topicArn,
        },
        ...lambdaProps,
      }
    );

    new sns.Subscription(this, "StockSubscription", {
      endpoint: process.env.SUBSCRIPTION_EMAIL!,
      protocol: sns.SubscriptionProtocol.EMAIL,
      topic: importProductTopic,
    });

    importProductTopic.grantPublish(catalogBatchProcessLambda);
    catalogBatchProcessLambda.addEventSource(
      new SqsEventSource(importQueue, { batchSize: 5 })
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
