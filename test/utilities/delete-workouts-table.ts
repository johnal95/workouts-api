import { DeleteTableCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";

import { dynamoDBClient } from "./dynamodb-client";

const { DYNAMO_DB_WORKOUTS_TABLE_NAME } = process.env;

if (!DYNAMO_DB_WORKOUTS_TABLE_NAME) {
    throw new Error("Environment variable not found: 'DYNAMO_DB_WORKOUTS_TABLE_NAME'");
}

const deleteWorkoutsTable = async (): Promise<void> => {
    const listTablesCommand = new ListTablesCommand({});

    const { TableNames } = await dynamoDBClient.send(listTablesCommand);

    if (TableNames?.includes(DYNAMO_DB_WORKOUTS_TABLE_NAME)) {
        const deleteTableCommand = new DeleteTableCommand({
            TableName: DYNAMO_DB_WORKOUTS_TABLE_NAME,
        });
        await dynamoDBClient.send(deleteTableCommand);
    }
};

export { deleteWorkoutsTable };
