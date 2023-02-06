import { CreateTableCommand } from "@aws-sdk/client-dynamodb";

import { dynamoDBClient } from "./dynamodb-client";

const createDynamoDbTable = async (tableName: string, primaryKey = "id"): Promise<void> => {
    const createTableCommand = new CreateTableCommand({
        TableName: tableName,
        KeySchema: [{ KeyType: "HASH", AttributeName: primaryKey }],
        AttributeDefinitions: [{ AttributeType: "S", AttributeName: primaryKey }],
        ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    });

    await dynamoDBClient.send(createTableCommand);
};

export { createDynamoDbTable };
