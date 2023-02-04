import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { WorkoutV1Dto } from "../../src/api/workouts/dto/workout-v1.dto";
import { ErrorResponseDto } from "../../src/exceptions/error-response.dto";
import { ddbDocClient } from "../../src/repository/dynamodb/ddb-doc-client";
import { setupTestContext } from "../utilities/setup-test-context";

describe("GET /api/v1/workouts", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const context = await setupTestContext();
        app = context.app;
    });

    it("should get list of workouts", async () => {
        jest.spyOn(ddbDocClient, "send").mockImplementationOnce(() => ({
            Items: [
                { WorkoutID: { S: "workout-1" }, WorkoutName: { S: "First workout" } },
                { WorkoutID: { S: "workout-2" }, WorkoutName: { S: "Second workout" } },
            ],
        }));

        const response = await request(app.getHttpServer()).get("/api/v1/workouts");

        expect(response.status).toBe(200);
        expect(response.body).toEqual<WorkoutV1Dto[]>([
            { id: "workout-1", name: "First workout" },
            { id: "workout-2", name: "Second workout" },
        ]);
    });

    it("should respond with relevant error when workouts fail to be retrieved", async () => {
        jest.spyOn(ddbDocClient, "send").mockImplementationOnce(() => {
            throw new Error("findAll failed");
        });

        const response = await request(app.getHttpServer()).get("/api/v1/workouts");

        expect(response.status).toBe(500);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 500,
            error: "Internal Server Error",
            message: "An error [Error] occurred while handling the request: findAll failed",
            timestamp: expect.any(String),
        });
    });
});
