"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mock_1 = require("../mock");
const utils_1 = require("../utils");
const handler = async ({ pathParameters, }) => {
    try {
        const productId = pathParameters?.productId;
        if (!productId) {
            return (0, utils_1.buildResponse)(404, "Product not found!");
        }
        const product = mock_1.products.find((product) => product.id === productId);
        if (!product) {
            return (0, utils_1.buildResponse)(404, "Product not found!");
        }
        return (0, utils_1.buildResponse)(200, product);
    }
    catch (error) {
        return (0, utils_1.buildResponse)(500, {
            message: error.message,
        });
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdEJ5SWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0QnlJZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrQ0FBbUM7QUFDbkMsb0NBQXlDO0FBRWxDLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxFQUM1QixjQUFjLEdBQ1YsRUFBMkIsRUFBRTtJQUNqQyxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUU1QyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLENBQUM7U0FDakQ7UUFFRCxNQUFNLE9BQU8sR0FBd0IsZUFBUSxDQUFDLElBQUksQ0FDaEQsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUN0QyxDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sSUFBQSxxQkFBYSxFQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3BDO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQXhCVyxRQUFBLE9BQU8sV0F3QmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvZHVjdCwgUmVzcG9uc2VTY2hlbWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuLi9tb2NrXCI7XHJcbmltcG9ydCB7IGJ1aWxkUmVzcG9uc2UgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKHtcclxuICBwYXRoUGFyYW1ldGVycyxcclxufTogYW55KTogUHJvbWlzZTxSZXNwb25zZVNjaGVtYT4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwcm9kdWN0SWQgPSBwYXRoUGFyYW1ldGVycz8ucHJvZHVjdElkO1xyXG5cclxuICAgIGlmICghcHJvZHVjdElkKSB7XHJcbiAgICAgIHJldHVybiBidWlsZFJlc3BvbnNlKDQwNCwgXCJQcm9kdWN0IG5vdCBmb3VuZCFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJvZHVjdDogUHJvZHVjdCB8IHVuZGVmaW5lZCA9IHByb2R1Y3RzLmZpbmQoXHJcbiAgICAgIChwcm9kdWN0KSA9PiBwcm9kdWN0LmlkID09PSBwcm9kdWN0SWRcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFwcm9kdWN0KSB7XHJcbiAgICAgIHJldHVybiBidWlsZFJlc3BvbnNlKDQwNCwgXCJQcm9kdWN0IG5vdCBmb3VuZCFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoMjAwLCBwcm9kdWN0KTtcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZSg1MDAsIHtcclxuICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuIl19