import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const { DYNAMO_DB_PORT } = process.env;

if (!DYNAMO_DB_PORT) {
    throw new Error("Environment variable not found: 'DYNAMO_DB_PORT'");
}

const dynamoDBClient = new DynamoDBClient({
    endpoint: `http://localhost:${DYNAMO_DB_PORT}`,
});

export { dynamoDBClient };
