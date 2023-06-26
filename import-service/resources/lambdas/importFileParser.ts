import { Handler, S3Event } from "aws-lambda";
import * as AWS from "aws-sdk";
//
import { buildResponse } from "/opt/utils";
import * as csv from "csv-parser";
import { s3Client } from "./s3Client";

export const handler: Handler = async (event: S3Event) => {
  try {
    for (const record of event.Records) {
      const bucketName = record.s3.bucket.name;
      const objectKey = record.s3.object.key;

      const sqs = new AWS.SQS();

      const s3Stream = s3Client
        .getObject({
          Bucket: bucketName,
          Key: objectKey,
        })
        .createReadStream();

      await new Promise((resolve) => {
        s3Stream
          .pipe(csv({ separator: "," }))
          .on("data", async (data: any) => {
            const item = {
              MessageBody: JSON.stringify(data),
            };

            await sqs.sendMessage(
              {
                QueueUrl: process.env.IMPORT_SQS_URL!,
                ...item,
              },
              (error, data) => {
                console.log("ITEN: ", {
                  QueueUrl: process.env.IMPORT_SQS_URL!,
                  ...item,
                });

                if (error) {
                  console.log("ERROR: ", error);
                } else {
                  console.log("Message has been delivered successfully!");
                }
              }
            );
          })
          .on("error", (error: any) => console.log("ERROR: ", error))
          .on("end", async () => {
            console.log(`Copied from path ${bucketName}/${objectKey}`);

            await s3Client
              .copyObject({
                Bucket: bucketName!,
                CopySource: `${bucketName}/${objectKey}`,
                Key: objectKey.replace("uploaded", "parsed"),
              })
              .promise();

            await s3Client
              .deleteObject({
                Bucket: bucketName!,
                Key: objectKey,
              })
              .promise();

            console.log("Succesfully copied!");

            resolve("Success");
          });
      });
    }

    return buildResponse(201, {
      message: "Success",
    });
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
