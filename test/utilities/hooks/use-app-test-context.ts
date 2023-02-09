import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import { AppModule } from "../../../src/app.module";
import { HttpExceptionFilter } from "../../../src/exceptions/http-exception-filter";
import { UnhandledExceptionFilter } from "../../../src/exceptions/unhandled-exception-filter";

interface AppTestContext {
    /**
     * App test context utility that retrieves the Nest app for the current test context.
     * @returns Nest application.
     */
    getApp: () => INestApplication;
    /**
     * App test context utility that retrieves the Nest app for the current test context.
     * @returns Testing module.
     */
    getFixture: () => TestingModule;
}

/**
 * Sets up Jest hooks for initializing a dedicated application context for the current test.
 * @returns App test context.
 */
const useAppTestContext = (): AppTestContext => {
    let app: INestApplication;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalFilters(new UnhandledExceptionFilter(), new HttpExceptionFilter());

        await app.init();
    });

    return {
        getApp: () => app,
        getFixture: () => moduleFixture,
    };
};

export { useAppTestContext };
