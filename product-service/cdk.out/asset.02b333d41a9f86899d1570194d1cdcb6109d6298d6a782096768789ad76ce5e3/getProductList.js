"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const utils_1 = require("/opt/utils");
const mock_1 = require("/opt/mock");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBMkM7QUFDM0Msb0NBQXFDO0FBRzlCLE1BQU0sT0FBTyxHQUFHLEtBQUssSUFBNkIsRUFBRTtJQUN6RCxJQUFJO1FBQ0YsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFLGVBQVEsQ0FBQyxDQUFDO0tBQ3JDO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQVJXLFFBQUEsT0FBTyxXQVFsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJ1aWxkUmVzcG9uc2UgfSBmcm9tIFwiL29wdC91dGlsc1wiO1xyXG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIvb3B0L21vY2tcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VTY2hlbWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoKTogUHJvbWlzZTxSZXNwb25zZVNjaGVtYT4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZSgyMDAsIHByb2R1Y3RzKTtcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZSg1MDAsIHtcclxuICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuIl19