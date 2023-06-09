import { buildResponse } from "../layers/utils";
import { products } from "../layers/mock";
import { ResponseSchema } from "../interfaces";

export const handler = async (): Promise<ResponseSchema> => {
  try {
    return buildResponse(200, products);
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
