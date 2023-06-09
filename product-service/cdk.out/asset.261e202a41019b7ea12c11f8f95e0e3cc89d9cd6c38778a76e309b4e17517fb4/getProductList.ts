import { products } from "../mock";
import { ResponseSchema, buildResponse } from "../utils";

export const handler = async (): Promise<ResponseSchema> => {
  try {
    return buildResponse(200, {
      products: products,
    });
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};