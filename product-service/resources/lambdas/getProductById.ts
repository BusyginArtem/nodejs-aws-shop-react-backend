import * as AWS from "aws-sdk";
import { Handler } from "aws-lambda";
//
import { buildResponse, logRequestArguments } from "/opt/utils";

const dynamo = new AWS.DynamoDB.DocumentClient();

export const handler: Handler = async ({ pathParameters }: any) => {
  try {
    logRequestArguments(pathParameters);

    const { productId } = pathParameters;

    if (!productId) {
      return buildResponse(400, {
        message: "Wrong params!",
      });
    }

    const productTable = {
      TableName: process.env.PRODUCTS_TABLE!,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": productId,
      },
    };

    const stockTable = {
      TableName: process.env.STOCKS_TABLE!,
      KeyConditionExpression: "product_id = :id",
      ExpressionAttributeValues: {
        ":id": productId,
      },
    };

    const { Items: products } = await dynamo.query(productTable).promise();
    const { Items: stocks } = await dynamo.query(stockTable).promise();

    if (!products?.length) {
      return buildResponse(404, {
        message: "Product not found!",
      });
    }

    return buildResponse(200, {
      ...products![0],
      ...stocks![0],
    });
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
