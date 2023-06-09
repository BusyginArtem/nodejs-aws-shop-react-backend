interface Product {
    description: string;
    id: string;
    price: number;
    title: string;
}
export declare const products: Product[];
declare const enum HTTPStatusCode {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500
}
export type ResponseSchema = {
    statusCode: HTTPStatusCode;
    body: string;
    headers: {
        [key: string]: string | boolean;
    };
};
export declare const buildResponse: (statusCode: HTTPStatusCode, body: any) => ResponseSchema;
export declare const handler: () => Promise<ResponseSchema>;
export {};
