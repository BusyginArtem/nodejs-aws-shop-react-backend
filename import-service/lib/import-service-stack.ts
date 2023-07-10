import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3notifications from "aws-cdk-lib/aws-s3-notifications";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config();

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': "'*'",
  'Access-Control-Allow-Headers': "'*'",
  'Access-Control-Allow-Methods': "'GET'",
};

export class ImportServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apiGateway.RestApi(this, "ImportApi", {
      restApiName: "Import Service",
      deployOptions: {
        stageName: "dev",
      },
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        allowMethods: apiGateway.Cors.ALL_METHODS,
        allowCredentials: true,
      },
    });

    api.addGatewayResponse("UNAUTHORIZED_API_RESPONSE", {
      type: apiGateway.ResponseType.UNAUTHORIZED,
      responseHeaders: CORS_HEADERS
    });

    api.addGatewayResponse("ACCESS_DENIED_API_RESPONSE", {
      type: apiGateway.ResponseType.ACCESS_DENIED,
      responseHeaders: CORS_HEADERS
    });

    new cdk.CfnOutput(this, "apiUrl", { value: api.url });

    const importBucket = s3.Bucket.fromBucketName(
      this,
      "importBucket",
      process.env.S3_BUCKET_NAME!
    );

    const queue = sqs.Queue.fromQueueArn(
      this,
      "CatalogItemsQueue",
      process.env.SQS_ARN!
    );

    // Lambda layers
    const utilsLayer = new lambda.LayerVersion(this, "utils-layer", {
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "layers", "utils")
      ),
      description: "utils",
      license: "Apache-2.0",
      compatibleRuntimes: [lambda.Runtime.NODEJS_16_X],
    });

    const csvLayer = new lambda.LayerVersion(this, "csv-layer", {
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "layers", "csv")
      ),
      description: "csv",
      license: "Apache-2.0",
      compatibleRuntimes: [lambda.Runtime.NODEJS_16_X],
    });

    const lambdaProps = {
      runtime: lambda.Runtime.NODEJS_16_X,
      environment: {
        S3_BUCKET_NAME: process.env.S3_BUCKET_NAME!,
        AWS_RESOURCES_REGION: process.env.AWS_RESOURCES_REGION!,
        IMPORT_SQS_URL: queue.queueUrl,
      },
      bundling: {
        minify: false,
        externalModules: ["aws-sdk", "csv-parser"],
      },
      layers: [utilsLayer, csvLayer],
    };

    // Lambdas
    const importProductsFileLambda = new lambda.Function(
      this,
      "import-products-file-lambda",
      {
        ...lambdaProps,
        handler: "importProductsFile.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "..", "resources", "lambdas")
        ),
      }
    );

    const importFileParserLambda = new lambda.Function(
      this,
      "import-file-parser-lambda",
      {
        ...lambdaProps,
        handler: "importFileParser.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "..", "resources", "lambdas")
        ),
      }
    );

    queue.grantSendMessages(importFileParserLambda);

    const basicAuthorizerLambda = lambda.Function.fromFunctionArn(
      this,
      "basicAuthorizerFromArn",
      process.env.AUTH_LAMBDA_ARN!
    );    

    const authorizer = new apiGateway.RequestAuthorizer(
      this,
      "BasicAuthorizer",
      {
        authorizerName: "BasicAuthorizer",
        handler: basicAuthorizerLambda,
        identitySources: [apiGateway.IdentitySource.header('Authorization')],
      }
    );

    // Routes
    const importFiles = api.root.addResource("import");

    importFiles.addMethod(
      "GET",
      new apiGateway.LambdaIntegration(importProductsFileLambda, {
        proxy: true,
      }),
      {
        authorizer,
        authorizationType: apiGateway.AuthorizationType.CUSTOM,
        requestParameters: {
          "method.request.querystring.name": true,
        },
        requestValidatorOptions: {
          validateRequestParameters: true,
        },
      }
    );

    importBucket.grantReadWrite(importProductsFileLambda);
    importBucket.grantReadWrite(importFileParserLambda);
    importBucket.grantDelete(importFileParserLambda);
    importBucket.grantPut(importFileParserLambda);

    importBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3notifications.LambdaDestination(importFileParserLambda),
      { prefix: "uploaded/" }
    );
  }
}
