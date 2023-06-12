import { ScanCommand } from "@aws-sdk/lib-dynamodb";
/* eslint-disable import/extensions, import/no-absolute-path */
import { dbClient } from "/opt/db";
import { buildResponse } from "/opt/utils";

export const handler = async () => {
  try {
    const productTable = {
      TableName: process.env!.PRODUCTS_TABLE,
    };

    const stockTable = {
      TableName: process.env!.STOCKS_TABLE,
    };

    const productCommand = new ScanCommand(productTable);
    const stockCommand = new ScanCommand(stockTable);

    const { Items: productItems = [] } = await dbClient.send(productCommand);
    const { Items: stockItems = [] } = await dbClient.send(stockCommand);

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
