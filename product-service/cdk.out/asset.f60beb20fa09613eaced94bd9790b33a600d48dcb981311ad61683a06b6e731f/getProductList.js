"use strict";
// import { products } from "../mock";
// import { ResponseSchema, buildResponse } from "../utils";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.buildResponse = void 0;
const mock_1 = require("./mock");
const buildResponse = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(body),
    };
};
exports.buildResponse = buildResponse;
const handler = async () => {
    try {
        return (0, exports.buildResponse)(200, {
            products: mock_1.products,
        });
    }
    catch (error) {
        return (0, exports.buildResponse)(500, {
            message: error.message,
        });
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXNDO0FBQ3RDLDREQUE0RDs7O0FBRTVELGlDQUFrQztBQWlCM0IsTUFBTSxhQUFhLEdBQUcsQ0FDM0IsVUFBMEIsRUFDMUIsSUFBUyxFQUNPLEVBQUU7SUFDbEIsT0FBTztRQUNMLFVBQVU7UUFDVixPQUFPLEVBQUU7WUFDUCxrQ0FBa0MsRUFBRSxJQUFJO1lBQ3hDLDZCQUE2QixFQUFFLEdBQUc7WUFDbEMsOEJBQThCLEVBQUUsR0FBRztTQUNwQztRQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztLQUMzQixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBYlcsUUFBQSxhQUFhLGlCQWF4QjtBQUVLLE1BQU0sT0FBTyxHQUFHLEtBQUssSUFBNkIsRUFBRTtJQUN6RCxJQUFJO1FBQ0YsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLFFBQVEsRUFBRSxlQUFRO1NBQ25CLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQVZXLFFBQUEsT0FBTyxXQVVsQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IHByb2R1Y3RzIH0gZnJvbSBcIi4uL21vY2tcIjtcclxuLy8gaW1wb3J0IHsgUmVzcG9uc2VTY2hlbWEsIGJ1aWxkUmVzcG9uc2UgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmltcG9ydCB7IHByb2R1Y3RzIH0gZnJvbSBcIi4vbW9ja1wiO1xyXG5cclxuY29uc3QgZW51bSBIVFRQU3RhdHVzQ29kZSB7XHJcbiAgT0sgPSAyMDAsXHJcbiAgQ3JlYXRlZCA9IDIwMSxcclxuICBCYWRSZXF1ZXN0ID0gNDAwLFxyXG4gIEZvcmJpZGRlbiA9IDQwMyxcclxuICBOb3RGb3VuZCA9IDQwNCxcclxuICBJbnRlcm5hbFNlcnZlckVycm9yID0gNTAwLFxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBSZXNwb25zZVNjaGVtYSA9IHtcclxuICBzdGF0dXNDb2RlOiBIVFRQU3RhdHVzQ29kZTtcclxuICBib2R5OiBzdHJpbmc7XHJcbiAgaGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYnVpbGRSZXNwb25zZSA9IChcclxuICBzdGF0dXNDb2RlOiBIVFRQU3RhdHVzQ29kZSxcclxuICBib2R5OiBhbnlcclxuKTogUmVzcG9uc2VTY2hlbWEgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBzdGF0dXNDb2RlLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCI6IHRydWUsXHJcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLFxyXG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIjogXCIqXCIsXHJcbiAgICB9LFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKCk6IFByb21pc2U8UmVzcG9uc2VTY2hlbWE+ID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoMjAwLCB7XHJcbiAgICAgIHByb2R1Y3RzOiBwcm9kdWN0cyxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKDUwMCwge1xyXG4gICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iXX0=