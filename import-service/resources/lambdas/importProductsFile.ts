import { APIGatewayProxyResult, APIGatewayEvent, Handler } from "aws-lambda";
//
import { buildResponse } from "/opt/utils";
import { s3Client } from "./s3Client";

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const fileName = event.queryStringParameters?.name;

    if (!fileName) {
      return buildResponse(400, { message: "Missing parameter 'name'!" });
    }

    if (fileName.slice(-4) !== ".csv") {
      return buildResponse(400, { message: "Only .csv files can be proccessed!" });
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `uploaded/${fileName}`,
      Expires: 60,
      ContentType: "text/csv",
    };

    const response = await s3Client.getSignedUrlPromise("putObject", params);

    return buildResponse(200, response);
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
