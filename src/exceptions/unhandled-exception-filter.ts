import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";

import { buildErrorResponse } from "./build-error-response";
import { ErrorResponseDto } from "./error-response.dto";

@Catch()
class UnhandledExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();

        const res = ctx.getResponse<Response<ErrorResponseDto>>();

        const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

        const errorName = exception instanceof Error ? exception.name : "unknown";

        const errorMessage = `An error [${errorName}] occurred while handling the request${
            exception instanceof Error ? `: ${exception.message}` : ""
        }`;

        const errorResponse = buildErrorResponse(statusCode, errorMessage);

        res.status(statusCode).json(errorResponse);
    }
}

export { UnhandledExceptionFilter };
