import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { Config } from "./config";
import { HttpExceptionFilter } from "./exceptions/http-exception-filter";
import { Logger } from "./logging/logger";

const logger = new Logger("Server");

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });

    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(Config.PORT);
}

bootstrap()
    .then(() => {
        logger.log(`Server listening on port ${Config.PORT}`);
    })
    .catch((err: unknown) => {
        logger.error("An error occurred starting the server", err);
        throw err;
    });
