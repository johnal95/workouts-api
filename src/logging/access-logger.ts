import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { Logger } from "./logger";

@Injectable()
class AccessLogger implements NestMiddleware {
    private logger = new Logger(AccessLogger.name);

    use(req: Request, res: Response, next: NextFunction): void {
        const reqMeta = {
            requestId: req.header("RequestId"),
            requestMethod: req.method,
            requestUri: req.originalUrl || req.url,
            requestProtocol: `HTTP/${req.httpVersion}`,
        };

        req.on("close", () => {
            const resMeta = {
                responseCode: res.statusCode,
                responseSize: Number(res.getHeader("Content-Length")) || 0,
            };

            const message = `${reqMeta.requestMethod} ${reqMeta.requestUri} [${resMeta.responseCode}]`;

            if (String(resMeta.responseCode).startsWith("5")) {
                this.logger.error(message, { ...reqMeta, ...resMeta });
            } else if (String(resMeta.responseCode).startsWith("4")) {
                this.logger.warn(message, { ...reqMeta, ...resMeta });
            } else {
                this.logger.log(message, { ...reqMeta, ...resMeta });
            }
        });

        next();
    }
}

export { AccessLogger };
