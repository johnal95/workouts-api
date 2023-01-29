import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import { AppModule } from "../../src/app.module";
import { HttpExceptionFilter } from "../../src/exceptions/http-exception-filter";
import { UnhandledExceptionFilter } from "../../src/exceptions/unhandled-exception-filter";

const setupTestContext = async (): Promise<{
    app: INestApplication;
    moduleFixture: TestingModule;
}> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    const app: INestApplication = moduleFixture.createNestApplication();

    app.useGlobalFilters(new UnhandledExceptionFilter(), new HttpExceptionFilter());

    await app.init();

    return { app, moduleFixture };
};

export { setupTestContext };
