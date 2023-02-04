const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");

const { DYNAMO_DB_WORKOUTS_TABLE_NAME } = process.env;

/** @param {DynamoDBClient} client */
const createWorkoutsTable = async (client) => {
  const createTableCommand = new CreateTableCommand({
    TableName: DYNAMO_DB_WORKOUTS_TABLE_NAME,
    KeySchema: [
      {
        KeyType: "HASH", // Partition Key
        AttributeName: "WorkoutID",
      },
    ],
    AttributeDefinitions: [
      {
        AttributeType: "S", // String Type
        AttributeName: "WorkoutID",
      },
    ],
    ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
  });

  console.info(`Creating new table: ${DYNAMO_DB_WORKOUTS_TABLE_NAME}`);
  const { TableDescription } = await client.send(createTableCommand);
  console.info("Table created successfully:", TableDescription.TableArn);
};

module.exports = { createWorkoutsTable };
