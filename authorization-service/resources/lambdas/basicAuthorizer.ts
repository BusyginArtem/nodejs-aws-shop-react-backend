import {
  Context,
  Handler,
  Callback,
  APIGatewayAuthorizerResult,
  APIGatewayRequestAuthorizerEvent,
} from "aws-lambda";
import * as dotenv from "dotenv";

dotenv.config();

const getPassword = (login: string) => {
  const password = process.env[login];
  console.log("[LOGIN]: ", login)
  console.log("[PASSWORD]: ", password)
  if (!password) {
    return "";
  }

  return password;
};

const generatePolicy = (
  principalId: string,
  effect: string,
  resource: string
): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};

export const handler: Handler = async (
  event: APIGatewayRequestAuthorizerEvent,
  context: Context,
  callback: Callback
) => {
  try {
    const token = event!.headers!.Authorization;
    console.log("[TOKEN]: ", token)
    if (!token) {
      // callback("Unauthorized");

      // return;
      return {
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': ['Authorization', 'Content-Type']
        },
        statusCode:401,
        body:JSON.stringify('Unauthorized'),
      }
    }

    const [login, password] = Buffer.from(token!, "base64")
      .toString()
      .split(":");

    const storedPassword = getPassword(login);

    if (storedPassword !== password) {
      callback(null, generatePolicy("*", "Deny", event.methodArn));

      return;
    }

    callback(
      null,
      generatePolicy("apigateway.amazonaws.com", "Allow", event.methodArn)
    );
  } catch (error) {
    callback(null, generatePolicy("*", "Deny", event.methodArn));
  }
};
