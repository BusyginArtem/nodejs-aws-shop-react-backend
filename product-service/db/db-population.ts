import { PutCommand } from "@aws-sdk/lib-dynamodb";
//
import { DBItem } from "./interfaces";
import DB_ITEMS from "./db-items";
import { dbClient } from ".";

export const addDocument = async (doc: DBItem) => {
  const command = new PutCommand(doc);

  const response = await dbClient.send(command);
  console.log(response);
  return response;
};

DB_ITEMS.map((item) => addDocument(item));
