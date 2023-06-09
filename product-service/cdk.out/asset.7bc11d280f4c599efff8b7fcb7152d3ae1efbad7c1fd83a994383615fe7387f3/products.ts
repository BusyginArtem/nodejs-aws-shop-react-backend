import { products } from "../mock.js";
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

export const getProductById = async (id: string): Promise<ResponseSchema> => {
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
