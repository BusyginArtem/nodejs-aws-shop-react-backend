import { QueryCommand } from "@aws-sdk/client-dynamodb";
//
import { buildResponse, logRequestArguments } from "/opt/utils";
import { dbClient } from "/opt/db";
// import { Product, Stock } from "./interfaces";

export const handler = async ({ pathParameters }: any) => {
  try {
    logRequestArguments(pathParameters);

    const { productId } = pathParameters;

    if (!productId) {
      return buildResponse(400, {
        message: "Wrong params!",
      });
    }

    const productTable = {
      TableName: process.env!.PRODUCTS_TABLE,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": { S: productId },
      },
    };

    const stockTable = {
      TableName: process.env!.STOCKS_TABLE,
      KeyConditionExpression: "product_id = :id",
      ExpressionAttributeValues: {
        ":id": { S: productId },
      },
    };

    const productCommand = new QueryCommand(productTable);
    const stockCommand = new QueryCommand(stockTable);

    const { Items: products = [] } = await dbClient.send(productCommand);
    const { Items: stocks = [] } = await dbClient.send(stockCommand);

    if (!products.length) {
      return buildResponse(404, {
        message: "Product not found!",
      });
    }

    const {
      id: { S: id },
      title: { S: title },
      description: { S: description },
      price: { N: price },
    } = products[0];

    return buildResponse(200, {
      id: id,
      title: title,
      description: description,
      price: price,
      ...{ count: Number(stocks?.[0].count.N) ?? 0 },
    });
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
