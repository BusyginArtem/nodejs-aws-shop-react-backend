import { Handler, SQSEvent } from "aws-lambda";
import { SNS } from "aws-sdk";
import { error } from "console";

const sns = new SNS();

export const handler: Handler = async (event: SQSEvent) => {
  try {
    const records = event.Records;

    for (const record of records) {
      console.log("Record: %j", record);

      let input = JSON.parse(record.body);

      if (!input.title || !input.description || !input.count || !input.price) {
        console.error("Incorrect input values");
        throw error;
      }
    }

    await sns
      .publish({
        Subject: "New files were added to catalog!",
        Message: JSON.stringify({ test: "test" }),
        TopicArn: process.env.SNS_TOPIC_ARN!,
        MessageAttributes: {
          count: {
            DataType: "Number",
          },
        },
      })
      .promise();
  } catch (error: any) {
    console.error(`Error: ${error}`);
  }
};
