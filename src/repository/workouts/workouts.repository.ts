import { randomUUID as uuidv4 } from "node:crypto";
import {
    DeleteCommand,
    GetCommand,
    PutCommand,
    ScanCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";

import { Logger } from "../../logging/logger";
import { ddbDocClient } from "../dynamodb/ddb-doc-client";
import { WorkoutEntity } from "./types/workout.entity";

@Injectable()
class WorkoutsRepository {
    private readonly logger = new Logger(WorkoutsRepository.name);

    async findAll(): Promise<WorkoutEntity[]> {
        this.logger.info(`Retrieving all items from ${this.getTableName()}`);
        const scanCommand = new ScanCommand({ TableName: this.getTableName() });
        const { Items } = await ddbDocClient.send(scanCommand);
        return Items as WorkoutEntity[];
    }

    async findById(id: string): Promise<WorkoutEntity | null> {
        this.logger.info(`Retrieving item with id ${id} from ${this.getTableName()}`);
        const getCommand = new GetCommand({ TableName: this.getTableName(), Key: { id } });
        const { Item } = await ddbDocClient.send(getCommand);
        return Item ? (Item as WorkoutEntity) : null;
    }

    async save(workoutName: string): Promise<WorkoutEntity> {
        const workout: WorkoutEntity = {
            id: uuidv4(),
            name: workoutName,
            createdAt: Date.now(),
        };
        this.logger.info(`Saving item with id ${workout.id} in ${this.getTableName()}`);
        const putCommand = new PutCommand({ TableName: this.getTableName(), Item: workout });
        await ddbDocClient.send(putCommand);

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
