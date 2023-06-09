import { HTTPStatusCode, ResponseSchema } from "../../../interfaces";

export const buildResponse = (
  statusCode: HTTPStatusCode,
  body: any
): ResponseSchema => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(body),
  };
};
