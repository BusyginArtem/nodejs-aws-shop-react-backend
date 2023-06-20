import * as AWS from "aws-sdk";

export const s3Client = new AWS.S3({
  region: process.env.AWS_RESOURCES_REGION!,
});
