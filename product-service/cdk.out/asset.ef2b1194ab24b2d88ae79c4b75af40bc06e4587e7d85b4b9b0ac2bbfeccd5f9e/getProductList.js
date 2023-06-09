"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
/* eslint-disable import/extensions, import/no-absolute-path */
const nodejs_1 = require("/opt/utils/nodejs");
/* eslint-disable import/extensions, import/no-absolute-path */
const nodejs_2 = require("/opt/mock/nodejs");
const handler = async () => {
    try {
        return (0, nodejs_1.buildResponse)(200, nodejs_2.products);
    }
    catch (error) {
        return (0, nodejs_1.buildResponse)(500, {
            message: error.message,
        });
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrREFBK0Q7QUFDL0QsOENBQWtEO0FBQ2xELCtEQUErRDtBQUMvRCw2Q0FBNEM7QUFHckMsTUFBTSxPQUFPLEdBQUcsS0FBSyxJQUE2QixFQUFFO0lBQ3pELElBQUk7UUFDRixPQUFPLElBQUEsc0JBQWEsRUFBQyxHQUFHLEVBQUUsaUJBQVEsQ0FBQyxDQUFDO0tBQ3JDO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHNCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQVJXLFFBQUEsT0FBTyxXQVFsQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9leHRlbnNpb25zLCBpbXBvcnQvbm8tYWJzb2x1dGUtcGF0aCAqL1xyXG5pbXBvcnQgeyBidWlsZFJlc3BvbnNlIH0gZnJvbSBcIi9vcHQvdXRpbHMvbm9kZWpzXCI7XHJcbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9leHRlbnNpb25zLCBpbXBvcnQvbm8tYWJzb2x1dGUtcGF0aCAqL1xyXG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIvb3B0L21vY2svbm9kZWpzXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlU2NoZW1hIH0gZnJvbSBcIi4uL2ludGVyZmFjZXNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKCk6IFByb21pc2U8UmVzcG9uc2VTY2hlbWE+ID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoMjAwLCBwcm9kdWN0cyk7XHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoNTAwLCB7XHJcbiAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiJdfQ==