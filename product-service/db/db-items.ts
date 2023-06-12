import { randomUUID } from "crypto";

const productsTable = "Products";
const stocksTable = "Stocks";

const PRODUCT_1_ID = randomUUID();
const PRODUCT_2_ID = randomUUID();
const PRODUCT_3_ID = randomUUID();
const PRODUCT_4_ID = randomUUID();
const PRODUCT_5_ID = randomUUID();

export default [
  {
    TableName: productsTable,
    Item: {
      title: "Product 1",
      id: PRODUCT_1_ID,
      description: "Product 1 description",
      price: 10,
    },
  },
  {
    TableName: productsTable,
    Item: {
      title: "Product 2",
      id: PRODUCT_2_ID,
      description: "Product 2 description",
      price: 20,
    },
  },
  {
    TableName: productsTable,
    Item: {
      title: "Product 3",
      id: PRODUCT_3_ID,
      description: "Product 3 description",
      price: 30,
    },
  },
  {
    TableName: productsTable,
    Item: {
      title: "Product 4",
      id: PRODUCT_4_ID,
      description: "Product 4 description",
      price: 40,
    },
  },
  {
    TableName: productsTable,
    Item: {
      title: "Product 5",
      id: PRODUCT_5_ID,
      description: "Product 5 description",
      price: 50,
    },
  },
  {
    TableName: stocksTable,
    Item: {
      id: randomUUID(),
      product_id: PRODUCT_1_ID,
      count: 5,
    },
  },
  {
    TableName: stocksTable,
    Item: {
      id: randomUUID(),
      product_id: PRODUCT_2_ID,
      count: 7,
    },
  },
  {
    TableName: stocksTable,
    Item: {
      id: randomUUID(),
      product_id: PRODUCT_3_ID,
      count: 9,
    },
  },
  {
    TableName: stocksTable,
    Item: {
      id: randomUUID(),
      product_id: PRODUCT_4_ID,
      count: 1,
    },
  },
  {
    TableName: stocksTable,
    Item: {
      id: randomUUID(),
      product_id: PRODUCT_5_ID,
      count: 15,
    },
  },
];
