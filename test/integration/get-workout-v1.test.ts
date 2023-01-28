import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { ErrorResponse } from "../../src/exceptions/error-response";
import { WorkoutV1Dto } from "../../src/api/workout/types/workout-v1.dto";

import { setupApp } from "../utilities/setup-app";

describe("GET /api/v1/workouts/:id", () => {
    let app: INestApplication;

    beforeEach(async () => {
        app = await setupApp();
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
        expect(response.body).toEqual<ErrorResponse>({
            statusCode: 404,
            error: "Not Found",
            message: "Workout not found",
            timestamp: expect.any(String),
        });
    });
});
