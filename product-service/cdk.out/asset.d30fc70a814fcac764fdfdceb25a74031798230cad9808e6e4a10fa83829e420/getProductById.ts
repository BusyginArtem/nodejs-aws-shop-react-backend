import { Product, ResponseSchema } from "../interfaces";
import { products } from "./mock";
import { buildResponse } from "./utils";

export const handler = async (event: any): Promise<ResponseSchema> => {
  try {
    const id = event.pathParameters?.productId;

    if (!id) {
      return buildResponse(404, 'Product not found');
    }

    const product: Product | undefined = products.find((product) => product.id === id);

    if (!product) {
      return buildResponse(404, 'Product not found');
    }

    return buildResponse(200, product);
  } catch (error) {
    return buildResponse(500, error);
  }
};
