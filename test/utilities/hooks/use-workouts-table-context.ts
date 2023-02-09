import { v4 as uuidv4 } from "uuid";
import { PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

import { WorkoutEntity } from "../../../src/repository/workouts/types/workout.entity";
import { createDynamoDbTable } from "../create-dynamodb-table";
import { deleteDynamoDbTable } from "../delete-dynamodb-table";
import { dynamoDBClient } from "../dynamodb-client";

interface WorkoutsTableContext {
    /**
     * `workouts` table context utility for retrieving all entities from the table
     * in the current context.
     * @returns table entities.
     */
    getEntities: () => Promise<WorkoutEntity[]>;
    /**
     * `workouts` table context utility for adding entities to the table in
     * the current context.
     * @param entities - entities to add.
     */
    putEntities: (...entities: WorkoutEntity[]) => Promise<void>;
}

/**
 * Sets up Jest hooks for creating and deleting a dedicated `workouts` table
 * for the current Jest worker.
 * @returns `workouts` table context API.
 */
const useWorkoutsTableContext = (): WorkoutsTableContext => {
    const tableName = `test-workouts-${uuidv4()}`;

    process.env.DYNAMO_DB_WORKOUTS_TABLE_NAME = tableName;

    beforeEach(async () => {
        await createDynamoDbTable(tableName);
    });

    afterEach(async () => {
        await deleteDynamoDbTable(tableName);
    });

    return {
        getEntities: async () => {
            const scanCommand = new ScanCommand({ TableName: tableName });
            const { Items } = await dynamoDBClient.send(scanCommand);
            return (Items ?? []).map((item) => ({
                id: String(item.id?.S),
                name: String(item.name?.S),
                createdAt: Number(item.createdAt?.N),
            }));
        },
        putEntities: async (...entities: WorkoutEntity[]): Promise<void> => {
            for (const entity of entities) {
                const putItemCommand = new PutItemCommand({
                    TableName: tableName,
                    Item: {
                        id: { S: entity.id },
                        name: { S: entity.name },
                        createdAt: { N: String(entity.createdAt) },
                    },
                });
                await dynamoDBClient.send(putItemCommand);
            }
        },
    };
};

export { WorkoutsTableContext, useWorkoutsTableContext };
