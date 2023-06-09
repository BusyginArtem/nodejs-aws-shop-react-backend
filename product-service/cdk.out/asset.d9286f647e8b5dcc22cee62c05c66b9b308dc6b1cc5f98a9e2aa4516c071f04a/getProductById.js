"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mock_1 = require("./mock");
const utils_1 = require("./utils");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdEJ5SWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0QnlJZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpQ0FBa0M7QUFDbEMsbUNBQXdDO0FBRWpDLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxFQUM1QixjQUFjLEdBQ1YsRUFBMkIsRUFBRTtJQUNqQyxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUU1QyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLENBQUM7U0FDakQ7UUFFRCxNQUFNLE9BQU8sR0FBd0IsZUFBUSxDQUFDLElBQUksQ0FDaEQsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUN0QyxDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sSUFBQSxxQkFBYSxFQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3BDO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQXhCVyxRQUFBLE9BQU8sV0F3QmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvZHVjdCwgUmVzcG9uc2VTY2hlbWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuL21vY2tcIjtcclxuaW1wb3J0IHsgYnVpbGRSZXNwb25zZSB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jICh7XHJcbiAgcGF0aFBhcmFtZXRlcnMsXHJcbn06IGFueSk6IFByb21pc2U8UmVzcG9uc2VTY2hlbWE+ID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcHJvZHVjdElkID0gcGF0aFBhcmFtZXRlcnM/LnByb2R1Y3RJZDtcclxuXHJcbiAgICBpZiAoIXByb2R1Y3RJZCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRSZXNwb25zZSg0MDQsIFwiUHJvZHVjdCBub3QgZm91bmQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByb2R1Y3Q6IFByb2R1Y3QgfCB1bmRlZmluZWQgPSBwcm9kdWN0cy5maW5kKFxyXG4gICAgICAocHJvZHVjdCkgPT4gcHJvZHVjdC5pZCA9PT0gcHJvZHVjdElkXHJcbiAgICApO1xyXG5cclxuICAgIGlmICghcHJvZHVjdCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRSZXNwb25zZSg0MDQsIFwiUHJvZHVjdCBub3QgZm91bmQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKDIwMCwgcHJvZHVjdCk7XHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoNTAwLCB7XHJcbiAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiJdfQ==