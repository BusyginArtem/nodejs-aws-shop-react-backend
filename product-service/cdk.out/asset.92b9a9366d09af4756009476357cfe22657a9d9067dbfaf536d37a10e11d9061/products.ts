import { products } from "../mock";
import { ResponseSchema, buildResponse } from "../utils";

export const getProductList = async (): Promise<ResponseSchema> => {
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

export const getProductById = async (id: string) => {
  try {
    return buildResponse(200, {
      productt: products,
    });
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
