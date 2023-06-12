import { HTTPStatusCode, Product, ResponseSchema } from "./interfaces";

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

export const logRequestArguments = (params: unknown) =>
  console.log("Request arguments:", params);

export const areArgumentsInvalid = (body: Product) =>
  typeof body !== "object" ||
  typeof body!.description !== "string" ||
  typeof body!.price !== "number" ||
  typeof body!.title !== "string" ||
  typeof body!.count !== "number";
