import * as AWS from "aws-sdk";
import { randomUUID } from "crypto";
import { Handler, SQSEvent } from "aws-lambda";
import { SNS } from "aws-sdk";
import { error } from "console";

const dynamodb = new AWS.DynamoDB.DocumentClient();
const sns = new SNS();

export const handler: Handler = async (event: SQSEvent) => {
  try {
    const records = event.Records;

    for (const record of records) {
      const { description, price, title, count } = JSON.parse(record.body);

      if (!title || !description || !count || !price) {
        console.error("Incorrect input values");
        throw error;
      }

      const id = randomUUID();

      await dynamodb
        .transactWrite({
          TransactItems: [
            {
              Put: {
                TableName: process.env.PRODUCTS_TABLE!,
                Item: {
                  id,
                  description,
                  price: Number(price),
                  title,
                },
              },
            },
            {
              Put: {
                TableName: process.env.STOCKS_TABLE!,
                Item: {
                  product_id: id,
                  count: Number(count),
                },
              },
            },
          ],
        })
        .promise();
    }

    await sns
      .publish({
        Subject: "Batch processing was finished successfully.",
        Message: `New ${records.length} file(s) were added to catalog!`,
        TopicArn: process.env.SNS_TOPIC_ARN!,
      })
      .promise();
  } catch (error: any) {
    console.error(`Error: ${error}`);
  }
};
