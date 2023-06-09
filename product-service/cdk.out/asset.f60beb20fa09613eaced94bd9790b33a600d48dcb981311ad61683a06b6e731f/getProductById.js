"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mock_1 = require("./mock");
const utils_1 = require("../utils");
const handler = async (id) => {
    try {
        return (0, utils_1.buildResponse)(200, {
            productt: mock_1.products.find((product) => product.id === id),
        });
    }
    catch (error) {
        return (0, utils_1.buildResponse)(500, {
            message: error.message,
        });
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdEJ5SWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0QnlJZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBa0M7QUFDbEMsb0NBQXlEO0FBRWxELE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxFQUFVLEVBQTJCLEVBQUU7SUFDbkUsSUFBSTtRQUNGLE9BQU8sSUFBQSxxQkFBYSxFQUFDLEdBQUcsRUFBRTtZQUN4QixRQUFRLEVBQUUsZUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDeEQsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEtBQVUsRUFBRTtRQUNuQixPQUFPLElBQUEscUJBQWEsRUFBQyxHQUFHLEVBQUU7WUFDeEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQ3ZCLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQyxDQUFDO0FBVlcsUUFBQSxPQUFPLFdBVWxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiLi9tb2NrXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlU2NoZW1hLCBidWlsZFJlc3BvbnNlIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChpZDogc3RyaW5nKTogUHJvbWlzZTxSZXNwb25zZVNjaGVtYT4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZSgyMDAsIHtcclxuICAgICAgcHJvZHVjdHQ6IHByb2R1Y3RzLmZpbmQoKHByb2R1Y3QpID0+IHByb2R1Y3QuaWQgPT09IGlkKSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKDUwMCwge1xyXG4gICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iXX0=