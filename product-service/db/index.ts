import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  // region: process.env.AWS_RESOURCES_REGION,
  region: "eu-west-1",
});

export const dbClient = DynamoDBDocumentClient.from(client);
