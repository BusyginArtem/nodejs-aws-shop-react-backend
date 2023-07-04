import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dotenv from "dotenv";
import * as path from "path";
import { ServicePrincipal } from "aws-cdk-lib/aws-iam";

dotenv.config();

export class AuthorizationServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda layers
    const utilsLayer = new lambda.LayerVersion(this, "utils-layer", {
      code: lambda.Code.fromAsset(
        path.join(__dirname, "..", "resources", "layers", "utils")
      ),
      description: "utils",
      license: "Apache-2.0",
      compatibleRuntimes: [lambda.Runtime.NODEJS_16_X],
    });

    const lambdaProps = {
      runtime: lambda.Runtime.NODEJS_16_X,
      environment: {
        TEST_PASSWORD: process.env.TEST_PASSWORD!,
        GITHUB_ACCOUNT_LOGIN: process.env.GITHUB_ACCOUNT_LOGIN!,
        AWS_RESOURCES_REGION: process.env.AWS_RESOURCES_REGION!,
      },
      layers: [utilsLayer],
    };

    const basicAuthorizerLambda = new lambda.Function(
      this,
      "basic-authorizer-lambda",
      {
        ...lambdaProps,
        handler: "basicAuthorizer.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "..", "resources", "lambdas")
        ),
      }
    );

    basicAuthorizerLambda.addPermission("ImportApiGatewayPermissions", {
      principal: new ServicePrincipal("apigateway.amazonaws.com"),
      sourceArn: process.env.IMPORT_API_GATEWAY_ARN,
    });
  }
}
