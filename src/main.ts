import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import { Config } from "./config/config";
import { HttpExceptionFilter } from "./exceptions/http-exception-filter";
import { UnhandledExceptionFilter } from "./exceptions/unhandled-exception-filter";
import { Logger } from "./logging/logger";

const logger = new Logger("Server");

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(), { logger: false });

    app.useGlobalFilters(new UnhandledExceptionFilter(), new HttpExceptionFilter());

    await app.listen(Config.PORT);
}

bootstrap()
    .then(() => {
        logger.log(`Server listening on port ${Config.PORT}`);
    })
    .catch((err: unknown) => {
        logger.error("An error occurred starting the server:", err);
        throw err;
    });
