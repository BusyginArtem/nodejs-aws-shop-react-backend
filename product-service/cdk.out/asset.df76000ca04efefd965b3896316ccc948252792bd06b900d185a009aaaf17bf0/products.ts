import { ResponseSchema, buildResponse } from "../utils";

interface Product {
  description: string;
  id: string;
  price: number;
  title: string;
}

const products: Product[] = [
  {
    description: "Description of Product 1",
    id: "4367ec4b-b10c-48c6-9345-fc85c72a74aa",
    price: 50,
    title: "Product 1",
  },
  {
    description: "Description of Product 2",
    id: "4367ec4b-b10c-48c6-9345-fc85c72a74a1",
    price: 100,
    title: "Product 2",
  },
  {
    description: "Description of Product 3",
    id: "4367ec4b-b10c-48c6-9345-fc85c72a74a3",
    price: 150,
    title: "Product 3",
  },
  {
    description: "Description of Product 4",
    id: "3267ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 200,
    title: "Product 4",
  },
  {
    description: "Description of Product 5",
    id: "8867ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 250,
    title: "Product 5",
  },
  {
    description: "Description of Product 6",
    id: "1234ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 300,
    title: "Product 6",
  },
];

export const getProductList = async (): Promise<ResponseSchema> => {
  try {
    return buildResponse(200, {
      products: products,
    });
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};

export const getProductById = async (id: string): Promise<ResponseSchema> => {
  try {
    return buildResponse(200, {
      productt: products.find((product) => product.id === id),
    });
  } catch (error: any) {
    return buildResponse(500, {
      message: error.message,
    });
  }
};
