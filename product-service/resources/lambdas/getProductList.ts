// /* eslint-disable import/extensions, import/no-absolute-path */
// import { buildResponse } from "/opt/utils/nodejs";
// /* eslint-disable import/extensions, import/no-absolute-path */
// import { products } from "/opt/mock/nodejs";
import { ResponseSchema } from "./interfaces";
import { products } from "./mock";
import { buildResponse } from "./utils";

export const handler = async (): Promise<ResponseSchema> => {
  try {
    return buildResponse(200, products);
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
