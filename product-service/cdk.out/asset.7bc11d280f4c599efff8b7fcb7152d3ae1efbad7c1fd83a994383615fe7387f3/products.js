"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProductList = void 0;
const mock_1 = require("../mock");
const utils_1 = require("../utils");
const getProductList = async () => {
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
exports.getProductList = getProductList;
const getProductById = async (id) => {
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
exports.getProductById = getProductById;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9kdWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrQ0FBbUM7QUFDbkMsb0NBQXlEO0FBRWxELE1BQU0sY0FBYyxHQUFHLEtBQUssSUFBNkIsRUFBRTtJQUNoRSxJQUFJO1FBQ0YsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLFFBQVEsRUFBRSxlQUFRO1NBQ25CLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQVZXLFFBQUEsY0FBYyxrQkFVekI7QUFFSyxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQUUsRUFBVSxFQUEyQixFQUFFO0lBQzFFLElBQUk7UUFDRixPQUFPLElBQUEscUJBQWEsRUFBQyxHQUFHLEVBQUU7WUFDeEIsUUFBUSxFQUFFLGVBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ3hELENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQVZXLFFBQUEsY0FBYyxrQkFVekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuLi9tb2NrXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlU2NoZW1hLCBidWlsZFJlc3BvbnNlIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0UHJvZHVjdExpc3QgPSBhc3luYyAoKTogUHJvbWlzZTxSZXNwb25zZVNjaGVtYT4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZSgyMDAsIHtcclxuICAgICAgcHJvZHVjdHM6IHByb2R1Y3RzLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoNTAwLCB7XHJcbiAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0UHJvZHVjdEJ5SWQgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8UmVzcG9uc2VTY2hlbWE+ID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoMjAwLCB7XHJcbiAgICAgIHByb2R1Y3R0OiBwcm9kdWN0cy5maW5kKChwcm9kdWN0KSA9PiBwcm9kdWN0LmlkID09PSBpZCksXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZSg1MDAsIHtcclxuICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuIl19