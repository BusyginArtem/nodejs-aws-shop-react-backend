"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mock_1 = require("./mock");
const utils_1 = require("./utils");
const handler = async ({ pathParameters, }) => {
    try {
        const productId = pathParameters?.productId;
        if (!productId) {
            return (0, utils_1.buildResponse)(404, {
                message: "Product not found!"
            });
        }
        const product = mock_1.products.find((product) => product.id === productId);
        if (!product) {
            return (0, utils_1.buildResponse)(404, {
                message: "Product not found!"
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdEJ5SWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0QnlJZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxpQ0FBa0M7QUFDbEMsbUNBQXdDO0FBRWpDLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxFQUM1QixjQUFjLEdBQ1YsRUFBMkIsRUFBRTtJQUNqQyxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUU1QyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO2dCQUN4QixPQUFPLEVBQUUsb0JBQW9CO2FBQzlCLENBQUMsQ0FBQztTQUNKO1FBRUQsTUFBTSxPQUFPLEdBQXdCLGVBQVEsQ0FBQyxJQUFJLENBQ2hELENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FDdEMsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLElBQUEscUJBQWEsRUFBQyxHQUFHLEVBQUU7Z0JBQ3hCLE9BQU8sRUFBRSxvQkFBb0I7YUFDOUIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUEscUJBQWEsRUFBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDcEM7SUFBQyxPQUFPLEtBQVUsRUFBRTtRQUNuQixPQUFPLElBQUEscUJBQWEsRUFBQyxHQUFHLEVBQUU7WUFDeEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQ3ZCLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQyxDQUFDO0FBNUJXLFFBQUEsT0FBTyxXQTRCbEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvZXh0ZW5zaW9ucywgaW1wb3J0L25vLWFic29sdXRlLXBhdGggKi9cclxuLy8gaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiL29wdC9tb2NrL25vZGVqc1wiO1xyXG4vLyAvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvZXh0ZW5zaW9ucywgaW1wb3J0L25vLWFic29sdXRlLXBhdGggKi9cclxuLy8gaW1wb3J0IHsgYnVpbGRSZXNwb25zZSB9IGZyb20gXCIvb3B0L3V0aWxzL25vZGVqc1wiO1xyXG5pbXBvcnQgeyBQcm9kdWN0LCBSZXNwb25zZVNjaGVtYSB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiLi9tb2NrXCI7XHJcbmltcG9ydCB7IGJ1aWxkUmVzcG9uc2UgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoe1xyXG4gIHBhdGhQYXJhbWV0ZXJzLFxyXG59OiBhbnkpOiBQcm9taXNlPFJlc3BvbnNlU2NoZW1hPiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHByb2R1Y3RJZCA9IHBhdGhQYXJhbWV0ZXJzPy5wcm9kdWN0SWQ7XHJcblxyXG4gICAgaWYgKCFwcm9kdWN0SWQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoNDA0LCB7XHJcbiAgICAgICAgbWVzc2FnZTogXCJQcm9kdWN0IG5vdCBmb3VuZCFcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcm9kdWN0OiBQcm9kdWN0IHwgdW5kZWZpbmVkID0gcHJvZHVjdHMuZmluZChcclxuICAgICAgKHByb2R1Y3QpID0+IHByb2R1Y3QuaWQgPT09IHByb2R1Y3RJZFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoIXByb2R1Y3QpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoNDA0LCB7XHJcbiAgICAgICAgbWVzc2FnZTogXCJQcm9kdWN0IG5vdCBmb3VuZCFcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZSgyMDAsIHByb2R1Y3QpO1xyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKDUwMCwge1xyXG4gICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iXX0=