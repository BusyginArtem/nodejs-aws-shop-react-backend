"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const utils_1 = require("../utils");
const mock_1 = require("../mock");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQ0FBeUM7QUFDekMsa0NBQW1DO0FBRzVCLE1BQU0sT0FBTyxHQUFHLEtBQUssSUFBNkIsRUFBRTtJQUN6RCxJQUFJO1FBQ0YsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFLGVBQVEsQ0FBQyxDQUFDO0tBQ3JDO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQVJXLFFBQUEsT0FBTyxXQVFsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJ1aWxkUmVzcG9uc2UgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgcHJvZHVjdHMgfSBmcm9tIFwiLi4vbW9ja1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZVNjaGVtYSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jICgpOiBQcm9taXNlPFJlc3BvbnNlU2NoZW1hPiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKDIwMCwgcHJvZHVjdHMpO1xyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKDUwMCwge1xyXG4gICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iXX0=