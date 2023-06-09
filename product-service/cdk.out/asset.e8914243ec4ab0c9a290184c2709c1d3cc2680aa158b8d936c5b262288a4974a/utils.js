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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFTyxNQUFNLGFBQWEsR0FBRyxDQUMzQixVQUEwQixFQUMxQixJQUFTLEVBQ08sRUFBRTtJQUNsQixPQUFPO1FBQ0wsVUFBVTtRQUNWLE9BQU8sRUFBRTtZQUNQLGtDQUFrQyxFQUFFLElBQUk7WUFDeEMsNkJBQTZCLEVBQUUsR0FBRztZQUNsQyw4QkFBOEIsRUFBRSxHQUFHO1NBQ3BDO1FBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0tBQzNCLENBQUM7QUFDSixDQUFDLENBQUM7QUFiVyxRQUFBLGFBQWEsaUJBYXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSFRUUFN0YXR1c0NvZGUsIFJlc3BvbnNlU2NoZW1hIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkUmVzcG9uc2UgPSAoXHJcbiAgc3RhdHVzQ29kZTogSFRUUFN0YXR1c0NvZGUsXHJcbiAgYm9keTogYW55XHJcbik6IFJlc3BvbnNlU2NoZW1hID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgc3RhdHVzQ29kZSxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiOiB0cnVlLFxyXG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcclxuICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCI6IFwiKlwiLFxyXG4gICAgfSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxyXG4gIH07XHJcbn07XHJcbiJdfQ==