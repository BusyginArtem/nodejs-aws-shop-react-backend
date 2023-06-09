import { Product, ResponseSchema } from "../interfaces";
import { products } from "../mock";
import { buildResponse } from "../utils";

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
