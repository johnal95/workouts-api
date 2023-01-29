import { getReasonPhrase } from "http-status-codes";

import { ErrorResponse } from "./error-response.dto";

const buildErrorResponse = (
    statusCode: number,
    message: string,
    timestamp: string = new Date().toISOString(),
): ErrorResponse => ({
    statusCode,
    error: getReasonPhrase(statusCode),
    message,
    timestamp,
});

export { buildErrorResponse };
