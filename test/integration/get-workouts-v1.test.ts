import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { WorkoutV1Dto } from "../../src/api/workout/types/workout-v1.dto";
import { AppModule } from "../../src/app.module";

describe("GET /api/v1/workouts", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("should get list of workouts", async () => {
        const response = await request(app.getHttpServer()).get("/api/v1/workouts");

        expect(response.status).toBe(200);
        expect(response.body).toEqual<WorkoutV1Dto[]>([
            { id: "workout-1", name: "First workout" },
            { id: "workout-2", name: "Second workout" },
        ]);
    });
});
