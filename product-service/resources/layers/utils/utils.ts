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

export const areArgumentsInvalid = (body: string) => {
  const { description, price, title, count } = JSON.parse(body);

  return (
    typeof description !== "string" ||
    typeof price !== "number" ||
    typeof title !== "string" ||
    typeof count !== "number"
  );
};
