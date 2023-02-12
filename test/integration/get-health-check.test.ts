import * as request from "supertest";

import { HealthCheckDto } from "../../src/health/dto/health-check.dto";
import { HealthStatus } from "../../src/health/health-status";
import { useAppTestContext } from "../utilities/hooks/use-app-test-context";
import { utcIsoTimestampRegex } from "../utilities/regex/utc-iso-timestamp-regex";

describe("GET /health-check", () => {
    const { getApp } = useAppTestContext();

    it("should return healthy status", async () => {
        const response = await request(getApp().getHttpServer()).get("/health-check");

        expect(response.status).toBe(200);
        expect(response.body).toEqual<HealthCheckDto>({
            application: "workouts-api",
            status: HealthStatus.HEALTHY,
            startupTime: expect.stringMatching(utcIsoTimestampRegex),
            lastCheckTime: expect.stringMatching(utcIsoTimestampRegex),
        });
    });
});
