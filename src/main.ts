import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import { Config } from "./config/config";
import { HttpExceptionFilter } from "./exceptions/http-exception-filter";
import { UnhandledExceptionFilter } from "./exceptions/unhandled-exception-filter";
import { Logger } from "./logging/logger";
import { setupSwaggerModule } from "./swagger/setup-swagger-module";

const logger = new Logger("Server");

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(), { logger: false });

    app.useGlobalFilters(new UnhandledExceptionFilter(), new HttpExceptionFilter());

    setupSwaggerModule(app);

    await app.listen(Config.PORT);
};

bootstrap()
    .then(() => {
        logger.info(`Server listening on port ${Config.PORT}`);
    })
    .catch((err: unknown) => {
        logger.error("An error occurred starting the server:", err);
        throw err;
    });
