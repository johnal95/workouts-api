import { INestApplication } from "@nestjs/common";
import { TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { WorkoutV1Dto } from "../../src/api/workouts/dto/workout-v1.dto";
import { ErrorResponseDto } from "../../src/exceptions/error-response.dto";
import { WorkoutsRepository } from "../../src/repository/workouts/workouts.repository";
import { setupTestContext } from "../utilities/setup-test-context";

describe("POST /api/v1/workouts", () => {
    let app: INestApplication;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        const context = await setupTestContext();
        app = context.app;
        moduleFixture = context.moduleFixture;
    });

    it("add new workout", async () => {
        const repository = moduleFixture.get<WorkoutsRepository>(WorkoutsRepository);
        const workout = { name: "New workout" };

        const response = await request(app.getHttpServer())
            .post("/api/v1/workouts")
            .set("Accept", "application/json")
            .send(workout);

        expect(response.status).toBe(201);
        expect(response.body).toEqual<WorkoutV1Dto>({
            id: expect.any(String),
            name: "New workout",
        });

        const createdWorkout = repository.findById(response.body.id);
        expect(createdWorkout?.name).toBe(workout.name);
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
        const repository = moduleFixture.get<WorkoutsRepository>(WorkoutsRepository);
        jest.spyOn(repository, "save").mockImplementation(() => {
            throw new Error("save failed");
        });

        const workout = { name: "New workout" };

        const response = await request(app.getHttpServer())
            .post("/api/v1/workouts")
            .set("Accept", "application/json")
            .send(workout);

        expect(response.status).toBe(500);
        expect(response.body).toEqual<ErrorResponseDto>({
            statusCode: 500,
            error: "Internal Server Error",
            message: "An error [Error] occurred while handling the request: save failed",
            timestamp: expect.any(String),
        });
    });
});
