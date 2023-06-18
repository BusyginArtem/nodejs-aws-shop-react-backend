import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";

import { buildResponse } from "/opt/utils";

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    return buildResponse(201, {});
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
