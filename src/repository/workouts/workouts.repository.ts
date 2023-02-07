import { DeleteCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { Logger } from "../../logging/logger";
import { ddbDocClient } from "../dynamodb/ddb-doc-client";
import { WorkoutEntity } from "./types/workout.entity";

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
    private readonly logger = new Logger(WorkoutsRepository.name);

    async findAll(): Promise<WorkoutEntity[]> {
        this.logger.info(`Retrieving all items from ${this.getTableName()}`);
        const scanCommand = new ScanCommand({ TableName: this.getTableName() });
        const { Items } = await ddbDocClient.send(scanCommand);
        return Items as WorkoutEntity[];
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

    async update(workout: WorkoutEntity): Promise<void> {
        this.logger.info(`Updating item with id ${workout.id} from ${this.getTableName()}`);
        const updateCommand = new UpdateCommand({
            TableName: this.getTableName(),
            Key: { id: workout.id },
            AttributeUpdates: {
                name: { Value: workout.name },
            },
        });
        await ddbDocClient.send(updateCommand);
    }

    async deleteById(id: string): Promise<void> {
        this.logger.info(`Deleting item with id ${id} from ${this.getTableName()}`);
        const deleteCommand = new DeleteCommand({ TableName: this.getTableName(), Key: { id } });
        await ddbDocClient.send(deleteCommand);
    }

    private getTableName = (): string =>
        process.env.DYNAMO_DB_WORKOUTS_TABLE_NAME ?? "workouts-table";
}

export { WorkoutsRepository };
