"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mock_1 = require("../layers/mock");
const utils_1 = require("../layers/utils");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdEJ5SWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0QnlJZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5Q0FBMEM7QUFDMUMsMkNBQWdEO0FBRXpDLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxFQUM1QixjQUFjLEdBQ1YsRUFBMkIsRUFBRTtJQUNqQyxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUU1QyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLENBQUM7U0FDakQ7UUFFRCxNQUFNLE9BQU8sR0FBd0IsZUFBUSxDQUFDLElBQUksQ0FDaEQsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUN0QyxDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sSUFBQSxxQkFBYSxFQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3BDO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQXhCVyxRQUFBLE9BQU8sV0F3QmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvZHVjdCwgUmVzcG9uc2VTY2hlbWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuLi9sYXllcnMvbW9ja1wiO1xyXG5pbXBvcnQgeyBidWlsZFJlc3BvbnNlIH0gZnJvbSBcIi4uL2xheWVycy91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoe1xyXG4gIHBhdGhQYXJhbWV0ZXJzLFxyXG59OiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlU2NoZW1hPiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHByb2R1Y3RJZCA9IHBhdGhQYXJhbWV0ZXJzPy5wcm9kdWN0SWQ7XHJcblxyXG4gICAgaWYgKCFwcm9kdWN0SWQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoNDA0LCBcIlByb2R1Y3Qgbm90IGZvdW5kIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcm9kdWN0OiBQcm9kdWN0IHwgdW5kZWZpbmVkID0gcHJvZHVjdHMuZmluZChcclxuICAgICAgKHByb2R1Y3QpID0+IHByb2R1Y3QuaWQgPT09IHByb2R1Y3RJZFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoIXByb2R1Y3QpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoNDA0LCBcIlByb2R1Y3Qgbm90IGZvdW5kIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZSgyMDAsIHByb2R1Y3QpO1xyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKDUwMCwge1xyXG4gICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iXX0=