import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamoDB from "aws-cdk-lib/aws-dynamodb";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
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
      process.env.PRODUCTS_TABLE_ARN!
    );

    const stocksTable = dynamoDB.Table.fromTableArn(
      this,
      process.env.STOCKS_TABLE!,
      process.env.STOCKS_TABLE_ARN!
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
        allowOrigins: [
          "http://localhost:3000",
          "https://dn1txvkuheft7.cloudfront.net",
        ],
      },
    });

    const createProductTopic = new sns.Topic(this, "CreateProductTopic", {
      topicName: "CreateProductTopic",
    });

    const importQueue = new sqs.Queue(this, "CatalogItemsQueue", {
      queueName: "CatalogItemsQueue",
      retentionPeriod: cdk.Duration.hours(1),
      receiveMessageWaitTime: cdk.Duration.seconds(20),
      visibilityTimeout: cdk.Duration.seconds(30),
    });

    new cdk.CfnOutput(this, "apiUrl", { value: api.url });

    const utilsLayer = new lambda.LayerVersion(this, "UtilsLayer", {
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "layers", "utils")
      ),
      description: "utils",
      license: "Apache-2.0",
      compatibleRuntimes: [lambda.Runtime.NODEJS_16_X],
    });

    // To grant usage by other AWS accounts
    utilsLayer.addPermission("remote-account-grant", {
      accountId: "*",
    });

    const lambdaProps = {
      runtime: lambda.Runtime.NODEJS_16_X,
      bundling: {
        minify: false,
        externalModules: ["aws-sdk"],
      },
      layers: [utilsLayer],
      environment: {
        PRODUCTS_TABLE: process.env.PRODUCTS_TABLE!,
        STOCKS_TABLE: process.env.STOCKS_TABLE!,
        SNS_TOPIC_ARN: createProductTopic.topicArn,
      },
    };

    // Lambdas
    const getProductsLambda = new lambda.Function(this, "GetProductsLambda", {
      handler: "getProductList.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "lambdas")
      ),
      ...lambdaProps,
    });

    const getProductLambda = new lambda.Function(this, "GetProductLambda", {
      handler: "getProductById.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "lambdas")
      ),
      ...lambdaProps,
    });

    const createProductLambda = new lambda.Function(
      this,
      "CreateProductlambda",
      {
        ...lambdaProps,
        handler: "createProduct.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "..", "resources", "lambdas")
        ),
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
        ...lambdaProps,
      }
    );

    new sns.Subscription(this, "StockSubscription", {
      endpoint: process.env.SUBSCRIPTION_EMAIL!,
      protocol: sns.SubscriptionProtocol.EMAIL,
      topic: createProductTopic,
    });

    createProductTopic.grantPublish(catalogBatchProcessLambda);
    catalogBatchProcessLambda.addEventSource(
      new SqsEventSource(importQueue, { batchSize: 5 })
    );

    const filterPolicy = {
      title: sns.SubscriptionFilter.stringFilter({
        allowlist: ["Batch processing was finished successfully"],
      }),
    };

    createProductTopic.addSubscription(
      new subs.EmailSubscription(process.env.SUBSCRIPTION_EMAIL!)
    );

    createProductTopic.addSubscription(
      new subs.EmailSubscription(process.env.SUBSCRIPTION_EMAIL_FILTER!, {
        filterPolicy,
      })
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
    productsTable.grantReadWriteData(catalogBatchProcessLambda);
    stocksTable.grantReadData(getProductsLambda);
    stocksTable.grantReadData(getProductLambda);
    stocksTable.grantReadWriteData(createProductLambda);
    stocksTable.grantReadWriteData(catalogBatchProcessLambda);
  }
}
