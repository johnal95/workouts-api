import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { Config } from "./config/config";
import { HttpExceptionFilter } from "./exceptions/http-exception-filter";
import { UnhandledExceptionFilter } from "./exceptions/unhandled-exception-filter";
import { Logger } from "./logging/logger";

const logger = new Logger("Server");

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(), { logger: false });

    app.useGlobalFilters(new UnhandledExceptionFilter(), new HttpExceptionFilter());

    const config = new DocumentBuilder()
        .setTitle("Workouts API")
        .setDescription("An API for managing workout programs")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api/docs", app, document);

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
