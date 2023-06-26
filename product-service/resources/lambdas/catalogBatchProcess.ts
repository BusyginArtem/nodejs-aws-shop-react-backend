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
      console.log("Record: %j", record);

      const { description, price, title, count } = JSON.parse(record.body);

      console.log("VALUES: ", description, price, title, count);
      console.log("TYPES: ", typeof description, typeof price, typeof title, typeof count);

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
        Subject: "New files were added to catalog!",
        Message: JSON.stringify({ count: records.length }),
        TopicArn: process.env.SNS_TOPIC_ARN!,
      })
      .promise();
  } catch (error: any) {
    console.error(`Error: ${error}`);
  }
};
