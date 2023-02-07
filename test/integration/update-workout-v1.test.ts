import { INestApplication } from "@nestjs/common";
import { TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { WorkoutV1Dto } from "../../src/api/workouts/dto/workout-v1.dto";
import { ErrorResponseDto } from "../../src/exceptions/error-response.dto";
import { WorkoutsRepository } from "../../src/repository/workouts/workouts.repository";
import { ddbDocClient } from "../../src/repository/dynamodb/ddb-doc-client";
import { aWorkoutEntity } from "../mocks/workout-entity-builder";
import { setupTestContext } from "../utilities/setup-test-context";
import { setupWorkoutsTableContext } from "../utilities/setup-workouts-table-context";

describe("PUT /api/v1/workouts/:id", () => {
    let app: INestApplication;
    let moduleFixture: TestingModule;

    const workoutsTableContext = setupWorkoutsTableContext();

    beforeEach(async () => {
        const context = await setupTestContext();
        app = context.app;
        moduleFixture = context.moduleFixture;
    });

    it("should update existing workout", async () => {
        const givenEntity = aWorkoutEntity()
            .withId("test-workout")
            .withName("name-before-updating")
            .build();
        const repository = moduleFixture.get<WorkoutsRepository>(WorkoutsRepository);
        await workoutsTableContext.putEntities(givenEntity);
        jest.spyOn(repository, "findById").mockImplementationOnce(() => givenEntity);

        const updatedWorkout = { name: "name-after-updating" };

        const response = await request(app.getHttpServer())
            .put("/api/v1/workouts/test-workout")
            .set("Accept", "application/json")
            .send(updatedWorkout);

        expect(response.status).toBe(200);
        expect(response.body).toEqual<WorkoutV1Dto>({
            id: "test-workout",
            name: "name-after-updating",
        });

        const [workoutEntity] = await workoutsTableContext.getEntities();
        expect(workoutEntity?.id).toBe("test-workout");
        expect(workoutEntity?.name).toBe("name-after-updating");
    });

    it("should respond with relevant error when workout does not exist", async () => {
        const response = await request(app.getHttpServer())
            .put("/api/v1/workouts/non-existing-workout-id")
            .set("Accept", "application/json")
            .send({ name: "Update non existing workout" });

        expect(response.status).toBe(404);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 404,
            error: "Not Found",
            message: "Workout not found",
            timestamp: expect.any(String),
        });
    });

    it("should respond with relevant error when request body does not contain required field", async () => {
        const invalidWorkout = {};

        const response = await request(app.getHttpServer())
            .put("/api/v1/workouts/any-workout-id")
            .set("Accept", "application/json")
            .send(invalidWorkout);

        expect(response.status).toBe(400);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 400,
            error: "Bad Request",
            message: '"name" is required',
            timestamp: expect.any(String),
        });
    });

    it("should respond with relevant error when workout fails to be updated", async () => {
        jest.spyOn(ddbDocClient, "send").mockImplementationOnce(() => {
            throw new Error("update failed");
        });

        const response = await request(app.getHttpServer())
            .put("/api/v1/workouts/workout-1")
            .set("Accept", "application/json")
            .send({ name: "Update non existing workout" });

        expect(response.status).toBe(500);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 500,
            error: "Internal Server Error",
            message: "An error [Error] occurred while handling the request: update failed",
            timestamp: expect.any(String),
        });
    });
});
