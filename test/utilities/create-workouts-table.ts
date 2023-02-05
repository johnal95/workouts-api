import { CreateTableCommand } from "@aws-sdk/client-dynamodb";

import { dynamoDBClient } from "./dynamodb-client";

const { DYNAMO_DB_WORKOUTS_TABLE_NAME } = process.env;

if (!DYNAMO_DB_WORKOUTS_TABLE_NAME) {
    throw new Error("Environment variable not found: 'DYNAMO_DB_PORT'");
}

const createWorkoutsTable = async (): Promise<void> => {
    const createTableCommand = new CreateTableCommand({
        TableName: DYNAMO_DB_WORKOUTS_TABLE_NAME,
        KeySchema: [{ KeyType: "HASH", AttributeName: "id" }],
        AttributeDefinitions: [{ AttributeType: "S", AttributeName: "id" }],
        ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    });

    await dynamoDBClient.send(createTableCommand);
};

export { createWorkoutsTable };
