import * as AWS from "aws-sdk";
import { Handler } from "aws-lambda";
//
import { buildResponse } from "/opt/utils";

const dynamo = new AWS.DynamoDB.DocumentClient();

const scan = async (table: string) => {  
  const scanResults = await dynamo
    .scan({
      TableName: table!,
    })
    .promise();

  return scanResults.Items;
};

export const handler: Handler = async () => {
  try {
    const productItems = await scan(process.env.PRODUCTS_TABLE!);
    const stockItems = await scan(process.env.STOCKS_TABLE!);

    return buildResponse(
      200,
      productItems?.map((product) => ({
        ...product,
        count:
          stockItems?.find((stock) => stock.product_id === product.id)?.count ||
          0,
      }))
    );
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
