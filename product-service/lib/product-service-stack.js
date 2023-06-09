"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServiceStack = void 0;
const cdk = require("aws-cdk-lib");
const apiGateway = require("aws-cdk-lib/aws-apigateway");
const lambda = require("aws-cdk-lib/aws-lambda");
// import * as dotenv from "dotenv";
const path = require("path");
// dotenv.config();
class ProductServiceStack extends cdk.Stack {
    constructor(scope, id, props) {
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
            code: lambda.Code.fromAsset(path.join(__dirname, "..", "resources", "lambdas")),
            // layers: [productDataLayer, utilsLayer],
        });
        const getProductLambda = new lambda.Function(this, "get-product-lambda", {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: "getProductById.handler",
            code: lambda.Code.fromAsset(path.join(__dirname, "..", "resources", "lambdas")),
            // layers: [productDataLayer, utilsLayer],
        });
        // Routes
        // 👇 add /products and /products/:id resources
        const products = api.root.addResource("products");
        const product = products.addResource("{productId}");
        // 👇 integrate GET /products with getProductsLambda
        products.addMethod("GET", new apiGateway.LambdaIntegration(getProductsLambda, { proxy: true }));
        // 👇 integrate GET /product/:productId with getProductLambda
        product.addMethod("GET", new apiGateway.LambdaIntegration(getProductLambda, { proxy: true }));
    }
}
exports.ProductServiceStack = ProductServiceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zZXJ2aWNlLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZHVjdC1zZXJ2aWNlLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQyx5REFBeUQ7QUFDekQsaURBQWlEO0FBQ2pELG9DQUFvQztBQUNwQyw2QkFBNkI7QUFFN0IsbUJBQW1CO0FBRW5CLE1BQWEsbUJBQW9CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDaEQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNyRCxXQUFXLEVBQUUsaUJBQWlCO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixTQUFTLEVBQUUsS0FBSzthQUNqQjtZQUNELDJCQUEyQixFQUFFO2dCQUMzQix1QkFBdUI7Z0JBQ3ZCLFlBQVksRUFBRTtvQkFDWixjQUFjO29CQUNkLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixXQUFXO2lCQUNaO2dCQUNELFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO2dCQUNsRSxnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUM7YUFDcEI7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUV0RCxnQkFBZ0I7UUFDaEIsb0RBQW9EO1FBQ3BELFVBQVU7UUFDViwwQkFBMEI7UUFDMUIsTUFBTTtRQUNOLDhGQUE4RjtRQUM5RixzQ0FBc0M7UUFDdEMsd0RBQXdEO1FBQ3hELE1BQU07UUFDTixLQUFLO1FBRUwsb0VBQW9FO1FBQ3BFLDZGQUE2RjtRQUM3RiwwQkFBMEI7UUFDMUIsc0RBQXNEO1FBQ3RELE1BQU07UUFFTixVQUFVO1FBQ1YsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQ3pFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQ25EO1lBQ0QsMENBQTBDO1NBQzNDLENBQUMsQ0FBQztRQUVILE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUN2RSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUNuRDtZQUNELDBDQUEwQztTQUMzQyxDQUFDLENBQUM7UUFFSCxTQUFTO1FBQ1QsK0NBQStDO1FBQy9DLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFcEQsb0RBQW9EO1FBQ3BELFFBQVEsQ0FBQyxTQUFTLENBQ2hCLEtBQUssRUFDTCxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUNyRSxDQUFDO1FBRUYsNkRBQTZEO1FBQzdELE9BQU8sQ0FBQyxTQUFTLENBQ2YsS0FBSyxFQUNMLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQ3BFLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUE5RUQsa0RBOEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCAqIGFzIGFwaUdhdGV3YXkgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbi8vIGltcG9ydCAqIGFzIGRvdGVudiBmcm9tIFwiZG90ZW52XCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbi8vIGRvdGVudi5jb25maWcoKTtcblxuZXhwb3J0IGNsYXNzIFByb2R1Y3RTZXJ2aWNlU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBhcGkgPSBuZXcgYXBpR2F0ZXdheS5SZXN0QXBpKHRoaXMsIFwiUHJvZHVjdEFwaVwiLCB7XG4gICAgICByZXN0QXBpTmFtZTogXCJQcm9kdWN0IFNlcnZpY2VcIixcbiAgICAgIGRlcGxveU9wdGlvbnM6IHtcbiAgICAgICAgc3RhZ2VOYW1lOiBcImRldlwiLFxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICAvLyBhbGxvd0hlYWRlcnM6IFtcIipcIl0sXG4gICAgICAgIGFsbG93SGVhZGVyczogW1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCIsXG4gICAgICAgICAgXCJYLUFtei1EYXRlXCIsXG4gICAgICAgICAgXCJBdXRob3JpemF0aW9uXCIsXG4gICAgICAgICAgXCJYLUFwaS1LZXlcIixcbiAgICAgICAgXSxcbiAgICAgICAgYWxsb3dNZXRob2RzOiBbXCJPUFRJT05TXCIsIFwiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIlBBVENIXCIsIFwiREVMRVRFXCJdLFxuICAgICAgICBhbGxvd0NyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICBhbGxvd09yaWdpbnM6IFtcIipcIl0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJhcGlVcmxcIiwgeyB2YWx1ZTogYXBpLnVybCB9KTtcblxuICAgIC8vIExhbWJkYSBsYXllcnNcbiAgICAvLyBjb25zdCBwcm9kdWN0RGF0YUxheWVyID0gbmV3IGxhbWJkYS5MYXllclZlcnNpb24oXG4gICAgLy8gICB0aGlzLFxuICAgIC8vICAgXCJwcm9kdWN0LWRhdGEtbGF5ZXJcIixcbiAgICAvLyAgIHtcbiAgICAvLyAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi5cIiwgXCJyZXNvdXJjZXNcIiwgXCJsYXllcnNcIiwgXCJtb2NrXCIpKSxcbiAgICAvLyAgICAgZGVzY3JpcHRpb246IFwibW9ja2VkLXByb2R1Y3RzXCIsXG4gICAgLy8gICAgIGNvbXBhdGlibGVSdW50aW1lczogW2xhbWJkYS5SdW50aW1lLk5PREVKU18xOF9YXSxcbiAgICAvLyAgIH1cbiAgICAvLyApO1xuXG4gICAgLy8gY29uc3QgdXRpbHNMYXllciA9IG5ldyBsYW1iZGEuTGF5ZXJWZXJzaW9uKHRoaXMsIFwidXRpbHMtbGF5ZXJcIiwge1xuICAgIC8vICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi5cIiwgXCJyZXNvdXJjZXNcIiwgXCJsYXllcnNcIiwgXCJ1dGlsc1wiKSksXG4gICAgLy8gICBkZXNjcmlwdGlvbjogXCJ1dGlsc1wiLFxuICAgIC8vICAgY29tcGF0aWJsZVJ1bnRpbWVzOiBbbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE4X1hdLFxuICAgIC8vIH0pO1xuXG4gICAgLy8gTGFtYmRhc1xuICAgIGNvbnN0IGdldFByb2R1Y3RzTGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcImdldC1wcm9kdWN0cy1sYW1iZGFcIiwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE4X1gsXG4gICAgICBoYW5kbGVyOiBcImdldFByb2R1Y3RMaXN0LmhhbmRsZXJcIixcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcbiAgICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLlwiLCBcInJlc291cmNlc1wiLCBcImxhbWJkYXNcIilcbiAgICAgICksXG4gICAgICAvLyBsYXllcnM6IFtwcm9kdWN0RGF0YUxheWVyLCB1dGlsc0xheWVyXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGdldFByb2R1Y3RMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiZ2V0LXByb2R1Y3QtbGFtYmRhXCIsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xOF9YLFxuICAgICAgaGFuZGxlcjogXCJnZXRQcm9kdWN0QnlJZC5oYW5kbGVyXCIsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXG4gICAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi5cIiwgXCJyZXNvdXJjZXNcIiwgXCJsYW1iZGFzXCIpXG4gICAgICApLFxuICAgICAgLy8gbGF5ZXJzOiBbcHJvZHVjdERhdGFMYXllciwgdXRpbHNMYXllcl0sXG4gICAgfSk7XG5cbiAgICAvLyBSb3V0ZXNcbiAgICAvLyDwn5GHIGFkZCAvcHJvZHVjdHMgYW5kIC9wcm9kdWN0cy86aWQgcmVzb3VyY2VzXG4gICAgY29uc3QgcHJvZHVjdHMgPSBhcGkucm9vdC5hZGRSZXNvdXJjZShcInByb2R1Y3RzXCIpO1xuICAgIGNvbnN0IHByb2R1Y3QgPSBwcm9kdWN0cy5hZGRSZXNvdXJjZShcIntwcm9kdWN0SWR9XCIpO1xuXG4gICAgLy8g8J+RhyBpbnRlZ3JhdGUgR0VUIC9wcm9kdWN0cyB3aXRoIGdldFByb2R1Y3RzTGFtYmRhXG4gICAgcHJvZHVjdHMuYWRkTWV0aG9kKFxuICAgICAgXCJHRVRcIixcbiAgICAgIG5ldyBhcGlHYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGdldFByb2R1Y3RzTGFtYmRhLCB7IHByb3h5OiB0cnVlIH0pXG4gICAgKTtcblxuICAgIC8vIPCfkYcgaW50ZWdyYXRlIEdFVCAvcHJvZHVjdC86cHJvZHVjdElkIHdpdGggZ2V0UHJvZHVjdExhbWJkYVxuICAgIHByb2R1Y3QuYWRkTWV0aG9kKFxuICAgICAgXCJHRVRcIixcbiAgICAgIG5ldyBhcGlHYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGdldFByb2R1Y3RMYW1iZGEsIHsgcHJveHk6IHRydWUgfSlcbiAgICApO1xuICB9XG59XG4iXX0=