import { DeleteTableCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";

import { dynamoDBClient } from "./dynamodb-client";

const deleteDynamoDbTable = async (tableName: string): Promise<void> => {
    const listTablesCommand = new ListTablesCommand({});

    const { TableNames } = await dynamoDBClient.send(listTablesCommand);

    if (TableNames?.includes(tableName)) {
        const deleteTableCommand = new DeleteTableCommand({ TableName: tableName });
        await dynamoDBClient.send(deleteTableCommand);
    }
};

export { deleteDynamoDbTable };
