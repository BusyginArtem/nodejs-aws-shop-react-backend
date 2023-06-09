"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const mock_1 = require("../mock");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdEJ5SWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0QnlJZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrQ0FBbUM7QUFDbkMsb0NBQXlEO0FBRWxELE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxFQUFVLEVBQTJCLEVBQUU7SUFDbkUsSUFBSTtRQUNGLE9BQU8sSUFBQSxxQkFBYSxFQUFDLEdBQUcsRUFBRTtZQUN4QixRQUFRLEVBQUUsZUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDeEQsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEtBQVUsRUFBRTtRQUNuQixPQUFPLElBQUEscUJBQWEsRUFBQyxHQUFHLEVBQUU7WUFDeEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQ3ZCLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQyxDQUFDO0FBVlcsUUFBQSxPQUFPLFdBVWxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiLi4vbW9ja1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZVNjaGVtYSwgYnVpbGRSZXNwb25zZSB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8UmVzcG9uc2VTY2hlbWE+ID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoMjAwLCB7XHJcbiAgICAgIHByb2R1Y3R0OiBwcm9kdWN0cy5maW5kKChwcm9kdWN0KSA9PiBwcm9kdWN0LmlkID09PSBpZCksXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZSg1MDAsIHtcclxuICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuIl19