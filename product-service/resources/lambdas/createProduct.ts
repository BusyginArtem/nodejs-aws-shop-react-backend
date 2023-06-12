import { TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
/* eslint-disable import/extensions, import/no-absolute-path */
import { dbClient } from "/opt/db";
import {
  areArgumentsInvalid,
  buildResponse,
  logRequestArguments,
} from "/opt/utils";

export const handler = async (event: any) => {
  try {
    logRequestArguments(event.body);

    if (areArgumentsInvalid(event.body)) {
      return buildResponse(400, {
        message: "Product data is invalid!"
      });
    }

    const { description, price, title, count } = event.body;
    const id = randomUUID();

    const params = {
      TransactItems: [
        {
          Put: {
            TableName: process.env!.PRODUCTS_TABLE,
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
            TableName: process.env!.STOCKS_TABLE,
            Item: {
              product_id: id,
              count,
            },
          },
        },
      ],
    };

    const command = new TransactWriteCommand(params);
    await dbClient.send(command);

    return buildResponse(201, {});
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
