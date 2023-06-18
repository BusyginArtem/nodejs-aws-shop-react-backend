import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3notifications from "aws-cdk-lib/aws-s3-notifications";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config();

export class ImportServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apiGateway.RestApi(this, "ImportApi", {
      restApiName: "Import Service",
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
        allowMethods: ["OPTIONS", "GET", "POST"],
        allowCredentials: true,
        allowOrigins: ["*"],
      },
    });

    new cdk.CfnOutput(this, "apiUrl", { value: api.url });

    const importBucket = s3.Bucket.fromBucketName(
      this,
      "importBucket",
      process.env.S3_BUCKET_NAME!
    );

    // Lambda layers
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

    // // To grant usage by other AWS accounts
    // utilsLayer.addPermission("remote-account-grant", {
    //   accountId: "*",
    // });

    // Lambdas
    const importProductsFileLambda = new lambda.Function(
      this,
      "import-products-file-lambda",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "importProductsFile.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "..", "resources", "lambdas")
        ),
        environment: {
          S3_BUCKET_NAME: process.env.S3_BUCKET_NAME!,
        },
        layers: [utilsLayer],
      }
    );

    // // Defines the function url for the AWS Lambda
    // const importProductsFileLambdaUrl = importProductsFileLambda.addFunctionUrl({
    //   authType: lambda.FunctionUrlAuthType.NONE,
    // });

    // // print the function url after deployment
    // new cdk.CfnOutput(this, "ImportProductsFileLambdaUrl", { value: importProductsFileLambdaUrl.url });

    const importFileParserLambda = new lambda.Function(
      this,
      "import-file-parser-lambda",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "importFileParser.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "..", "resources", "lambdas")
        ),
        environment: {
          S3_BUCKET_NAME: process.env.S3_BUCKET_NAME!,
          AWS_RESOURCES_REGION: process.env.AWS_RESOURCES_REGION!,
        },
        layers: [utilsLayer],
      }
    );

    // Routes
    const importFiles = api.root.addResource("import");

    importFiles.addMethod(
      "GET",
      new apiGateway.LambdaIntegration(importProductsFileLambda, { proxy: true })
    );

    // 👇 using methods on the imported bucket
    importBucket.grantRead(new iam.AccountRootPrincipal());

    importBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3notifications.LambdaDestination(importFileParserLambda),
      { prefix: "uploaded/*" }
    );
  }
}
