import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { CreateWorkoutV1Dto } from "../../src/api/workouts/dto/create-workout-v1.dto";
import { WorkoutV1Dto } from "../../src/api/workouts/dto/workout-v1.dto";
import { ErrorResponseDto } from "../../src/exceptions/error-response.dto";
import { ddbDocClient } from "../../src/repository/dynamodb/ddb-doc-client";
import { setupTestContext } from "../utilities/setup-test-context";
import { setupWorkoutsTableContext } from "../utilities/setup-workouts-table-context";

describe("POST /api/v1/workouts", () => {
    let app: INestApplication;

    const workoutsTableContext = setupWorkoutsTableContext();

    beforeEach(async () => {
        const context = await setupTestContext();
        app = context.app;
    });

    it("should add new workout", async () => {
        const workout: CreateWorkoutV1Dto = { name: "New workout" };

        const response = await request(app.getHttpServer())
            .post("/api/v1/workouts")
            .set("Accept", "application/json")
            .send(workout);

        expect(response.status).toBe(201);
        expect(response.body).toEqual<WorkoutV1Dto>({
            id: expect.any(String),
            name: "New workout",
        });

        const [workoutEntity] = await workoutsTableContext.getEntities();
        expect(workoutEntity?.name).toBe(workout.name);
    });

    it("should respond with relevant error when request body does not contain required field", async () => {
        const invalidWorkout = {};

        const response = await request(app.getHttpServer())
            .post("/api/v1/workouts")
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

    it("should respond with relevant error when workout fails to be added", async () => {
        jest.spyOn(ddbDocClient, "send").mockImplementationOnce(() => {
            throw new Error("save failed");
        });

        const response = await request(app.getHttpServer())
            .post("/api/v1/workouts")
            .set("Accept", "application/json")
            .send({ name: "New workout" });

        expect(response.status).toBe(500);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 500,
            error: "Internal Server Error",
            message: "An error [Error] occurred while handling the request: save failed",
            timestamp: expect.any(String),
        });
    });
});
