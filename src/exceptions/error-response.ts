import { getReasonPhrase } from "http-status-codes";

interface ErrorResponse {
    readonly statusCode: number;
    readonly error: string;
    readonly message: string;
    readonly timestamp: string;
}

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

export { ErrorResponse, buildErrorResponse };
