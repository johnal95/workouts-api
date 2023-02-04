import { INestApplication } from "@nestjs/common";
import { TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { WorkoutV1Dto } from "../../src/api/workouts/dto/workout-v1.dto";
import { ErrorResponseDto } from "../../src/exceptions/error-response.dto";
import { WorkoutsRepository } from "../../src/repository/workouts/workouts.repository";
import { setupTestContext } from "../utilities/setup-test-context";

describe("GET /api/v1/workouts/:id", () => {
    let app: INestApplication;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        const context = await setupTestContext();
        app = context.app;
        moduleFixture = context.moduleFixture;
    });

    it("should get existing workout", async () => {
        const existingWorkoutId = "workout-1";

        const response = await request(app.getHttpServer()).get(
            `/api/v1/workouts/${existingWorkoutId}`,
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual<WorkoutV1Dto>({
            id: existingWorkoutId,
            name: "First workout",
        });
    });

    it("should respond with relevant error when workout does not exist", async () => {
        const response = await request(app.getHttpServer()).get(
            "/api/v1/workouts/non-existing-workout-id",
        );

        expect(response.status).toBe(404);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 404,
            error: "Not Found",
            message: "Workout not found",
            timestamp: expect.any(String),
        });
    });

    it("should respond with relevant error when workout fails to be retrieved", async () => {
        const repository = moduleFixture.get<WorkoutsRepository>(WorkoutsRepository);
        jest.spyOn(repository, "findById").mockImplementation(() => {
            throw new Error("findById failed");
        });

        const response = await request(app.getHttpServer()).get("/api/v1/workouts/workout-1");

        expect(response.status).toBe(500);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 500,
            error: "Internal Server Error",
            message: "An error [Error] occurred while handling the request: findById failed",
            timestamp: expect.any(String),
        });
    });
});
