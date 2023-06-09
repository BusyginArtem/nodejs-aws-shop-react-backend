import { products } from "../mock";
import { ResponseSchema, buildResponse } from "../utils";

export const handler = async (id: string): Promise<ResponseSchema> => {
  try {
    return buildResponse(200, {
      productt: products.find((product) => product.id === id),
    });
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
