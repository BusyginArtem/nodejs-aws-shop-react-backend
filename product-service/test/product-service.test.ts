import { handler as getProductList } from "../resources/lambdas/getProductList";
import { handler as getProductById } from "../resources/lambdas/getProductById";
import { products } from "../resources/lambdas/mock";

describe('get product list', () => {
  test('return an array of products', async () => {
    const result = await getProductList();

    expect(result.statusCode).toBe(200);
    expect(Array.isArray(JSON.parse(result.body))).toBe(true);
  });
});

describe('get product by id', () => {
  test('return a product from the list', async () => {
    const product = products[0];

    const result = await getProductById({
        pathParameters: { productId: product.id }
    });

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).title).toBe(product.title);
  });

  test('product not found', async () => {
    const result = await getProductById({
        pathParameters: { productId: "1" }
    });

    expect(result.statusCode).toBe(404);
    expect(JSON.parse(result.body).message).toBe('Product not found!');
  });
});
