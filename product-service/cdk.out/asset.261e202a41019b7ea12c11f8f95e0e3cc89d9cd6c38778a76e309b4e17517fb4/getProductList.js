"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mock_1 = require("../mock");
const utils_1 = require("../utils");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrQ0FBbUM7QUFDbkMsb0NBQXlEO0FBRWxELE1BQU0sT0FBTyxHQUFHLEtBQUssSUFBNkIsRUFBRTtJQUN6RCxJQUFJO1FBQ0YsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLFFBQVEsRUFBRSxlQUFRO1NBQ25CLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQVZXLFFBQUEsT0FBTyxXQVVsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2R1Y3RzIH0gZnJvbSBcIi4uL21vY2tcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VTY2hlbWEsIGJ1aWxkUmVzcG9uc2UgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKCk6IFByb21pc2U8UmVzcG9uc2VTY2hlbWE+ID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoMjAwLCB7XHJcbiAgICAgIHByb2R1Y3RzOiBwcm9kdWN0cyxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKDUwMCwge1xyXG4gICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59OyJdfQ==