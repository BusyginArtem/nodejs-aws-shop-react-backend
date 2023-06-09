"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const utils_1 = require("../layers/utils");
const mock_1 = require("../layers/mock");
const handler = async () => {
    try {
        return (0, utils_1.buildResponse)(200, mock_1.products);
    }
    catch (error) {
        return (0, utils_1.buildResponse)(500, {
            message: error.message,
        });
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBZ0Q7QUFDaEQseUNBQTBDO0FBR25DLE1BQU0sT0FBTyxHQUFHLEtBQUssSUFBNkIsRUFBRTtJQUN6RCxJQUFJO1FBQ0YsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFLGVBQVEsQ0FBQyxDQUFDO0tBQ3JDO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQVJXLFFBQUEsT0FBTyxXQVFsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJ1aWxkUmVzcG9uc2UgfSBmcm9tIFwiLi4vbGF5ZXJzL3V0aWxzXCI7XHJcbmltcG9ydCB7IHByb2R1Y3RzIH0gZnJvbSBcIi4uL2xheWVycy9tb2NrXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlU2NoZW1hIH0gZnJvbSBcIi4uL2ludGVyZmFjZXNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKCk6IFByb21pc2U8UmVzcG9uc2VTY2hlbWE+ID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoMjAwLCBwcm9kdWN0cyk7XHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoNTAwLCB7XHJcbiAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiJdfQ==