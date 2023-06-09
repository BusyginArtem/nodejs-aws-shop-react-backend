"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResponse = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFTyxNQUFNLGFBQWEsR0FBRyxDQUMzQixVQUEwQixFQUMxQixJQUFTLEVBQ08sRUFBRTtJQUNsQixPQUFPO1FBQ0wsVUFBVTtRQUNWLE9BQU8sRUFBRTtZQUNQLGtDQUFrQyxFQUFFLElBQUk7WUFDeEMsNkJBQTZCLEVBQUUsR0FBRztZQUNsQyw4QkFBOEIsRUFBRSxHQUFHO1NBQ3BDO1FBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0tBQzNCLENBQUM7QUFDSixDQUFDLENBQUM7QUFiVyxRQUFBLGFBQWEsaUJBYXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSFRUUFN0YXR1c0NvZGUsIFJlc3BvbnNlU2NoZW1hIH0gZnJvbSBcIi4uLy4uLy4uL2ludGVyZmFjZXNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBidWlsZFJlc3BvbnNlID0gKFxyXG4gIHN0YXR1c0NvZGU6IEhUVFBTdGF0dXNDb2RlLFxyXG4gIGJvZHk6IGFueVxyXG4pOiBSZXNwb25zZVNjaGVtYSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXR1c0NvZGUsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIjogdHJ1ZSxcclxuICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIsXHJcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiOiBcIipcIixcclxuICAgIH0sXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcclxuICB9O1xyXG59O1xyXG4iXX0=