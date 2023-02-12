import * as request from "supertest";

import { WorkoutV1Dto } from "../../src/api/workouts/dto/workout-v1.dto";
import { ErrorResponseDto } from "../../src/exceptions/error-response.dto";
import { ddbDocClient } from "../../src/repository/dynamodb/ddb-doc-client";
import { aWorkoutEntity } from "../utilities/builders/workout-entity-builder";
import { useAppTestContext } from "../utilities/hooks/use-app-test-context";
import { useWorkoutsTableContext } from "../utilities/hooks/use-workouts-table-context";
import { utcIsoTimestampRegex } from "../utilities/regex/utc-iso-timestamp-regex";

describe("GET /api/v1/workouts", () => {
    const { getApp } = useAppTestContext();

    const workoutsTableContext = useWorkoutsTableContext();

    it("should get list of workouts", async () => {
        await workoutsTableContext.putEntities(
            aWorkoutEntity().withId("workout-1").withName("1st workout").build(),
            aWorkoutEntity().withId("workout-2").withName("2nd workout").build(),
        );

        const response = await request(getApp().getHttpServer()).get("/api/v1/workouts");

        expect(response.status).toBe(200);
        expect(response.body).toEqual<WorkoutV1Dto[]>([
            { id: "workout-1", name: "1st workout" },
            { id: "workout-2", name: "2nd workout" },
        ]);
    });

    it("should respond with relevant error when workouts fail to be retrieved", async () => {
        jest.spyOn(ddbDocClient, "send").mockImplementationOnce(() => {
            throw new Error("findAll failed");
        });

        const response = await request(getApp().getHttpServer()).get("/api/v1/workouts");

        expect(response.status).toBe(500);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 500,
            error: "Internal Server Error",
            message: "An error [Error] occurred while handling the request: findAll failed",
            timestamp: expect.stringMatching(utcIsoTimestampRegex),
        });
    });
});
