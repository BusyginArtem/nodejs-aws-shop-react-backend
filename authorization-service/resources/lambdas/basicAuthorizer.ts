import {
  Handler,
  APIGatewayAuthorizerResult,
  APIGatewayRequestAuthorizerEvent,
} from "aws-lambda";

const validateCredentials = (login: string, password: string) => {
  console.log("[LOGIN]: ", login);
  console.log("[PASSWORD]: ", password);
  if (!password || !login) {
    return false;
  }

  if (
    login !== process.env.GITHUB_ACCOUNT_LOGIN ||
    password !== process.env.TEST_PASSWORD
  ) {
    return false;
  }

  return true;
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
  event: APIGatewayRequestAuthorizerEvent
) => {
  try {
    const token = event!.headers!.Authorization;
    console.log("[TOKEN]: ", token);

    if (!token) {
      return generatePolicy("*", "Deny", event.methodArn);
    }

    const [, credentials] = token!.split(" ");
    const [login, password] = Buffer.from(credentials!, "base64")
      .toString("utf-8")
      .split(":");

    if (!validateCredentials(login, password)) {
      return generatePolicy("*", "Deny", event.methodArn);
    }

    return generatePolicy("apigateway.amazonaws.com", "Allow", event.methodArn);
  } catch (error) {
    return generatePolicy("*", "Deny", event.methodArn);
  }
};
