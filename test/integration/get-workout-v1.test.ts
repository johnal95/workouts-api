import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { WorkoutV1Dto } from "../../src/api/workouts/dto/workout-v1.dto";
import { ErrorResponseDto } from "../../src/exceptions/error-response.dto";
import { ddbDocClient } from "../../src/repository/dynamodb/ddb-doc-client";
import { aWorkoutEntity } from "../mocks/workout-entity-builder";
import { setupTestContext } from "../utilities/setup-test-context";
import { setupWorkoutsTableContext } from "../utilities/setup-workouts-table-context";

describe("GET /api/v1/workouts/:id", () => {
    let app: INestApplication;

    const workoutsTableContext = setupWorkoutsTableContext();

    beforeEach(async () => {
        const context = await setupTestContext();
        app = context.app;
    });

    it("should get existing workout", async () => {
        await workoutsTableContext.putEntities(
            aWorkoutEntity().withId("test-workout-1").withName("name-1").build(),
            aWorkoutEntity().withId("test-workout-2").withName("name-2").build(),
        );
        const response = await request(app.getHttpServer()).get("/api/v1/workouts/test-workout-2");

        expect(response.status).toBe(200);
        expect(response.body).toEqual<WorkoutV1Dto>({
            id: "test-workout-2",
            name: "name-2",
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
        jest.spyOn(ddbDocClient, "send").mockImplementationOnce(() => {
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
