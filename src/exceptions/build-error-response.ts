import { getReasonPhrase } from "http-status-codes";

import { ErrorResponseDto } from "./error-response.dto";

const buildErrorResponse = (
    statusCode: number,
    message: string,
    timestamp: string = new Date().toISOString(),
): ErrorResponseDto => ({
    statusCode,
    error: getReasonPhrase(statusCode),
    message,
    timestamp,
});

export { buildErrorResponse };
