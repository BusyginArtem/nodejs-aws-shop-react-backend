export const enum HTTPStatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export type ResponseSchema = {
  statusCode: HTTPStatusCode;
  body: string;
  headers: { [key: string]: string | boolean };
};
