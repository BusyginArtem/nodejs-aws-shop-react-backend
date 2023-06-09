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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBd0M7QUFDeEMsaUNBQWtDO0FBRzNCLE1BQU0sT0FBTyxHQUFHLEtBQUssSUFBNkIsRUFBRTtJQUN6RCxJQUFJO1FBQ0YsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLFFBQVEsRUFBRSxlQUFRO1NBQ25CLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQVZXLFFBQUEsT0FBTyxXQVVsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJ1aWxkUmVzcG9uc2UgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuL21vY2tcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VTY2hlbWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoKTogUHJvbWlzZTxSZXNwb25zZVNjaGVtYT4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZSgyMDAsIHtcclxuICAgICAgcHJvZHVjdHM6IHByb2R1Y3RzLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoNTAwLCB7XHJcbiAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiJdfQ==