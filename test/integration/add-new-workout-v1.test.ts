import * as request from "supertest";

import { CreateWorkoutV1Dto } from "../../src/api/workouts/dto/create-workout-v1.dto";
import { WorkoutV1Dto } from "../../src/api/workouts/dto/workout-v1.dto";
import { ErrorResponseDto } from "../../src/exceptions/error-response.dto";
import { ddbDocClient } from "../../src/repository/dynamodb/ddb-doc-client";
import { useAppTestContext } from "../utilities/hooks/use-app-test-context";
import { useWorkoutsTableContext } from "../utilities/hooks/use-workouts-table-context";
import { utcIsoTimestampRegex } from "../utilities/regex/utc-iso-timestamp-regex";

describe("POST /api/v1/workouts", () => {
    const { getApp } = useAppTestContext();

    const workoutsTableContext = useWorkoutsTableContext();

    it("should add new workout", async () => {
        const workout: CreateWorkoutV1Dto = { name: "New workout" };

        const response = await request(getApp().getHttpServer())
            .post("/api/v1/workouts")
            .set("Accept", "application/json; charset=utf-8")
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

        const response = await request(getApp().getHttpServer())
            .post("/api/v1/workouts")
            .set("Accept", "application/json; charset=utf-8")
            .send(invalidWorkout);

        expect(response.status).toBe(400);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 400,
            error: "Bad Request",
            message: "must have required property 'name'",
            timestamp: expect.stringMatching(utcIsoTimestampRegex),
        });
    });

    it("should respond with relevant error when request body contains invalid field type", async () => {
        const invalidWorkout = { name: { invalid: "name" } };

        const response = await request(getApp().getHttpServer())
            .post("/api/v1/workouts")
            .set("Accept", "application/json; charset=utf-8")
            .send(invalidWorkout);

        expect(response.status).toBe(400);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 400,
            error: "Bad Request",
            message: "/name: must be string",
            timestamp: expect.stringMatching(utcIsoTimestampRegex),
        });
    });

    it("should respond with relevant error when workout fails to be added", async () => {
        jest.spyOn(ddbDocClient, "send").mockImplementationOnce(() => {
            throw new Error("save failed");
        });

        const response = await request(getApp().getHttpServer())
            .post("/api/v1/workouts")
            .set("Accept", "application/json; charset=utf-8")
            .send({ name: "New workout" });

        expect(response.status).toBe(500);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 500,
            error: "Internal Server Error",
            message: "An error [Error] occurred while handling the request: save failed",
            timestamp: expect.stringMatching(utcIsoTimestampRegex),
        });
    });
});
