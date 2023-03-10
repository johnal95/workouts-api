import * as request from "supertest";

import { ErrorResponseDto } from "../../src/exceptions/error-response.dto";
import { ddbDocClient } from "../../src/repository/dynamodb/ddb-doc-client";
import { aWorkoutEntity } from "../utilities/builders/workout-entity-builder";
import { useAppTestContext } from "../utilities/hooks/use-app-test-context";
import { useWorkoutsTableContext } from "../utilities/hooks/use-workouts-table-context";
import { utcIsoTimestampRegex } from "../utilities/regex/utc-iso-timestamp-regex";

describe("DELETE /api/v1/workouts/:id", () => {
    const { getApp } = useAppTestContext();

    const workoutsTableContext = useWorkoutsTableContext();

    it("should delete existing workout", async () => {
        await workoutsTableContext.putEntities(aWorkoutEntity().withId("test-workout").build());

        const entitiesBeforeDeleting = await workoutsTableContext.getEntities();
        const response = await request(getApp().getHttpServer()).delete(
            `/api/v1/workouts/test-workout`,
        );
        const entitiesAfterDeleting = await workoutsTableContext.getEntities();

        expect(response.status).toBe(204);
        expect(entitiesBeforeDeleting).toHaveLength(1);
        expect(entitiesAfterDeleting).toHaveLength(0);
    });

    it("should respond with relevant error when workout does not exist", async () => {
        const response = await request(getApp().getHttpServer()).delete(
            "/api/v1/workouts/non-existing-workout-id",
        );

        expect(response.status).toBe(404);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 404,
            error: "Not Found",
            message: "Workout not found",
            timestamp: expect.stringMatching(utcIsoTimestampRegex),
        });
    });

    it("should respond with relevant error when workout fails to be retrieved", async () => {
        jest.spyOn(ddbDocClient, "send").mockImplementationOnce(() => {
            throw new Error("deleteById failed");
        });

        const response = await request(getApp().getHttpServer()).delete(
            "/api/v1/workouts/workout-1",
        );

        expect(response.status).toBe(500);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 500,
            error: "Internal Server Error",
            message: "An error [Error] occurred while handling the request: deleteById failed",
            timestamp: expect.stringMatching(utcIsoTimestampRegex),
        });
    });
});
