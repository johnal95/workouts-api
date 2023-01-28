import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import { AppModule } from "../../src/app.module";
import { HttpExceptionFilter } from "../../src/exceptions/http-exception-filter";

const setupApp = async (): Promise<INestApplication> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    const app: INestApplication = moduleFixture.createNestApplication();

    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();

    return app;
};

export { setupApp };
