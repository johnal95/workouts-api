import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { Config } from "../../config/config";
import { Logger } from "../../logging/logger";
import { ddbDocClient } from "../dynamodb/ddb-doc-client";
import { WorkoutEntity } from "./types/workout.entity";
import { WorkoutsMapper } from "./workouts.mapper";

const inMemoryWorkouts: Record<string, WorkoutEntity> = {
    "workout-1": {
        id: "workout-1",
        name: "First workout",
        createdAt: Date.now(),
    },
    "workout-2": {
        id: "workout-2",
        name: "Second workout",
        createdAt: Date.now(),
    },
};

@Injectable()
class WorkoutsRepository {
    private static readonly TABLE_NAME = Config.DYNAMO_DB_WORKOUTS_TABLE_NAME;

    private readonly logger = new Logger(WorkoutsRepository.name);

    constructor(private readonly mapper: WorkoutsMapper) {}

    async findAll(): Promise<WorkoutEntity[]> {
        this.logger.info(`Retrieving all items from ${WorkoutsRepository.TABLE_NAME}`);
        const { Items } = await ddbDocClient.send(
            new ScanCommand({ TableName: WorkoutsRepository.TABLE_NAME }),
        );
        const entities = this.mapper.toEntities(Items ?? []);
        return entities;
    }

    findById(id: string): WorkoutEntity | null {
        return inMemoryWorkouts[id] ?? null;
    }

    save(workoutName: string): WorkoutEntity {
        const workout: WorkoutEntity = {
            id: uuidv4(),
            name: workoutName,
            createdAt: Date.now(),
        };

        inMemoryWorkouts[workout.id] = workout;

        return workout;
    }

    update(workout: WorkoutEntity): WorkoutEntity {
        inMemoryWorkouts[workout.id] = workout;

        return workout;
    }

    deleteById(id: string): void {
        delete inMemoryWorkouts[id];
    }
}

export { WorkoutsRepository };
