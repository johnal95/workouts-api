import { PutItemCommand } from "@aws-sdk/client-dynamodb";

import { WorkoutEntity } from "../../src/repository/workouts/types/workout.entity";
import { dynamoDBClient } from "./dynamodb-client";

const { DYNAMO_DB_WORKOUTS_TABLE_NAME } = process.env;

if (!DYNAMO_DB_WORKOUTS_TABLE_NAME) {
    throw new Error("Environment variable not found: 'DYNAMO_DB_WORKOUTS_TABLE_NAME'");
}

const putWorkoutEntites = async (...entities: WorkoutEntity[]): Promise<void> => {
    for (const entity of entities) {
        const putItemCommand = new PutItemCommand({
            TableName: DYNAMO_DB_WORKOUTS_TABLE_NAME,
            Item: {
                id: { S: entity.id },
                name: { S: entity.name },
                createdAt: { N: String(entity.createdAt) },
            },
        });
        await dynamoDBClient.send(putItemCommand);
    }
};

export { putWorkoutEntites };
