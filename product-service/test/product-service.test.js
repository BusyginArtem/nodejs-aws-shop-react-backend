"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getProductList_1 = require("../resources/lambdas/getProductList");
const getProductById_1 = require("../resources/lambdas/getProductById");
const mock_1 = require("../resources/lambdas/mock");
describe('get product list', () => {
    test('return an array of products', async () => {
        const result = await (0, getProductList_1.handler)();
        expect(result.statusCode).toBe(200);
        expect(Array.isArray(JSON.parse(result.body))).toBe(true);
    });
});
describe('get product by id', () => {
    test('return a product from the list', async () => {
        const product = mock_1.products[0];
        const result = await (0, getProductById_1.handler)({
            pathParameters: { productId: product.id }
        });
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).title).toBe(product.title);
    });
    test('product not found', async () => {
        const result = await (0, getProductById_1.handler)({
            pathParameters: { productId: "1" }
        });
        expect(result.statusCode).toBe(404);
        expect(JSON.parse(result.body).message).toBe('Product not found!');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zZXJ2aWNlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9kdWN0LXNlcnZpY2UudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdFQUFnRjtBQUNoRix3RUFBZ0Y7QUFDaEYsb0RBQXFEO0FBRXJELFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDaEMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzdDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSx3QkFBYyxHQUFFLENBQUM7UUFFdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtJQUNqQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDaEQsTUFBTSxPQUFPLEdBQUcsZUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSx3QkFBYyxFQUFDO1lBQ2hDLGNBQWMsRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFO1NBQzVDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ25DLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSx3QkFBYyxFQUFDO1lBQ2hDLGNBQWMsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7U0FDckMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3JFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVyIGFzIGdldFByb2R1Y3RMaXN0IH0gZnJvbSBcIi4uL3Jlc291cmNlcy9sYW1iZGFzL2dldFByb2R1Y3RMaXN0XCI7XG5pbXBvcnQgeyBoYW5kbGVyIGFzIGdldFByb2R1Y3RCeUlkIH0gZnJvbSBcIi4uL3Jlc291cmNlcy9sYW1iZGFzL2dldFByb2R1Y3RCeUlkXCI7XG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuLi9yZXNvdXJjZXMvbGFtYmRhcy9tb2NrXCI7XG5cbmRlc2NyaWJlKCdnZXQgcHJvZHVjdCBsaXN0JywgKCkgPT4ge1xuICB0ZXN0KCdyZXR1cm4gYW4gYXJyYXkgb2YgcHJvZHVjdHMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZ2V0UHJvZHVjdExpc3QoKTtcblxuICAgIGV4cGVjdChyZXN1bHQuc3RhdHVzQ29kZSkudG9CZSgyMDApO1xuICAgIGV4cGVjdChBcnJheS5pc0FycmF5KEpTT04ucGFyc2UocmVzdWx0LmJvZHkpKSkudG9CZSh0cnVlKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2dldCBwcm9kdWN0IGJ5IGlkJywgKCkgPT4ge1xuICB0ZXN0KCdyZXR1cm4gYSBwcm9kdWN0IGZyb20gdGhlIGxpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcHJvZHVjdCA9IHByb2R1Y3RzWzBdO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZ2V0UHJvZHVjdEJ5SWQoe1xuICAgICAgICBwYXRoUGFyYW1ldGVyczogeyBwcm9kdWN0SWQ6IHByb2R1Y3QuaWQgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0KHJlc3VsdC5zdGF0dXNDb2RlKS50b0JlKDIwMCk7XG4gICAgZXhwZWN0KEpTT04ucGFyc2UocmVzdWx0LmJvZHkpLnRpdGxlKS50b0JlKHByb2R1Y3QudGl0bGUpO1xuICB9KTtcblxuICB0ZXN0KCdwcm9kdWN0IG5vdCBmb3VuZCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnZXRQcm9kdWN0QnlJZCh7XG4gICAgICAgIHBhdGhQYXJhbWV0ZXJzOiB7IHByb2R1Y3RJZDogXCIxXCIgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0KHJlc3VsdC5zdGF0dXNDb2RlKS50b0JlKDQwNCk7XG4gICAgZXhwZWN0KEpTT04ucGFyc2UocmVzdWx0LmJvZHkpLm1lc3NhZ2UpLnRvQmUoJ1Byb2R1Y3Qgbm90IGZvdW5kIScpO1xuICB9KTtcbn0pO1xuIl19