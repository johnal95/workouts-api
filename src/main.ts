import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { Config } from "./config";
import { HttpExceptionFilter } from "./exceptions/http-exception-filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(Config.PORT);
}

bootstrap().catch((err: unknown) => {
    // log error
    throw err;
});
