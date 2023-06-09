"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const utils_1 = require("./utils");
const mock_1 = require("./mock");
const handler = async () => {
    try {
        return (0, utils_1.buildResponse)(200, {
            products: mock_1.products,
        });
    }
    catch (error) {
        return (0, utils_1.buildResponse)(500, {
            message: error.message,
        });
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBd0Q7QUFDeEQsaUNBQWtDO0FBRTNCLE1BQU0sT0FBTyxHQUFHLEtBQUssSUFBNkIsRUFBRTtJQUN6RCxJQUFJO1FBQ0YsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLFFBQVEsRUFBRSxlQUFRO1NBQ25CLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQVZXLFFBQUEsT0FBTyxXQVVsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc3BvbnNlU2NoZW1hLCBidWlsZFJlc3BvbnNlIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiLi9tb2NrXCI7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jICgpOiBQcm9taXNlPFJlc3BvbnNlU2NoZW1hPiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKDIwMCwge1xyXG4gICAgICBwcm9kdWN0czogcHJvZHVjdHMsXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZSg1MDAsIHtcclxuICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuIl19