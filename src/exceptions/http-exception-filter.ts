import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

import { buildErrorResponse } from "./build-error-response";
import { ErrorResponseDto } from "./error-response.dto";

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();

        const res = ctx.getResponse<Response<ErrorResponseDto>>();

        const statusCode = exception.getStatus();

        const errorResponse = buildErrorResponse(statusCode, exception.message);

        res.status(statusCode).json(errorResponse);
    }
}

export { HttpExceptionFilter };
