import * as request from "supertest";

import { WorkoutV1Dto } from "../../src/api/workouts/dto/workout-v1.dto";
import { ErrorResponseDto } from "../../src/exceptions/error-response.dto";
import { ddbDocClient } from "../../src/repository/dynamodb/ddb-doc-client";
import { aWorkoutEntity } from "../utilities/builders/workout-entity-builder";
import { useAppTestContext } from "../utilities/hooks/use-app-test-context";
import { useWorkoutsTableContext } from "../utilities/hooks/use-workouts-table-context";
import { utcIsoTimestampRegex } from "../utilities/regex/utc-iso-timestamp-regex";

describe("PUT /api/v1/workouts/:id", () => {
    const { getApp } = useAppTestContext();

    const workoutsTableContext = useWorkoutsTableContext();

    it("should update existing workout", async () => {
        await workoutsTableContext.putEntities(
            aWorkoutEntity().withId("test-workout").withName("name-before-updating").build(),
        );

        const updatedWorkout = { name: "name-after-updating" };

        const response = await request(getApp().getHttpServer())
            .put("/api/v1/workouts/test-workout")
            .set("Accept", "application/json; charset=utf-8")
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
        const response = await request(getApp().getHttpServer())
            .put("/api/v1/workouts/non-existing-workout-id")
            .set("Accept", "application/json; charset=utf-8")
            .send({ name: "Update non existing workout" });

        expect(response.status).toBe(404);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 404,
            error: "Not Found",
            message: "Workout not found",
            timestamp: expect.stringMatching(utcIsoTimestampRegex),
        });
    });

    it("should respond with relevant error when request body does not contain required field", async () => {
        const invalidWorkout = {};

        const response = await request(getApp().getHttpServer())
            .put("/api/v1/workouts/any-workout-id")
            .set("Accept", "application/json; charset=utf-8")
            .send(invalidWorkout);

        expect(response.status).toBe(400);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 400,
            error: "Bad Request",
            message: '"name" is required',
            timestamp: expect.stringMatching(utcIsoTimestampRegex),
        });
    });

    it("should respond with relevant error when workout fails to be updated", async () => {
        jest.spyOn(ddbDocClient, "send").mockImplementationOnce(() => {
            throw new Error("update failed");
        });

        const response = await request(getApp().getHttpServer())
            .put("/api/v1/workouts/workout-1")
            .set("Accept", "application/json; charset=utf-8")
            .send({ name: "Update non existing workout" });

        expect(response.status).toBe(500);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 500,
            error: "Internal Server Error",
            message: "An error [Error] occurred while handling the request: update failed",
            timestamp: expect.stringMatching(utcIsoTimestampRegex),
        });
    });
});
