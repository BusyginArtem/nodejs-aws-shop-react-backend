import { Product, ResponseSchema } from "../interfaces";
/* eslint-disable import/extensions, import/no-absolute-path */
import { products } from "/opt/mock/nodejs";
/* eslint-disable import/extensions, import/no-absolute-path */
import { buildResponse } from "/opt/utils/nodejs";

export const handler = async ({
  pathParameters,
}: any): Promise<ResponseSchema> => {
  try {
    const productId = pathParameters?.productId;

    if (!productId) {
      return buildResponse(404, "Product not found!");
    }

    const product: Product | undefined = products.find(
      (product) => product.id === productId
    );

    if (!product) {
      return buildResponse(404, "Product not found!");
    }

    return buildResponse(200, product);
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
