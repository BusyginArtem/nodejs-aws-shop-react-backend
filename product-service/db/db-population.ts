import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DBItem } from "../interfaces";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const productsTable = "Products";
const stocksTable = "Stocks";

export const addDocument = async (doc: DBItem) => {
  const command = new PutCommand(doc);

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

addDocument({
  TableName: productsTable,
  Item: { slotPosition: { N: "0" }, title: { S: "Test" } },
});
