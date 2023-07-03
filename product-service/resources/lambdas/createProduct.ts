import { randomUUID } from "crypto";
import { Handler } from "aws-cdk-lib/aws-lambda";
import * as AWS from "aws-sdk";
//
import {
  areArgumentsInvalid,
  buildResponse,
  logRequestArguments,
} from "/opt/utils";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler: Handler = async (event: any) => {
  try {
    logRequestArguments(event.body);

    if (areArgumentsInvalid(event.body)) {
      return buildResponse(400, {
        message: "Product data is invalid!",
        event,
        body: JSON.parse(event.body),
      });
    }

    const { description, price, title, count } = JSON.parse(event.body);

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
                price,
                title,
              },
            },
          },
          {
            Put: {
              TableName: process.env.STOCKS_TABLE!,
              Item: {
                product_id: id,
                count,
              },
            },
          },
        ],
      })
      .promise();

    return buildResponse(201, {
      message: `Product ${id} was successfully created!`,
    });
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
