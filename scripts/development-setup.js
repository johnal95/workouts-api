require("dotenv/config");
const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

const { createWorkoutsTable } = require("./utilities/create-workouts-table");
const { deleteWorkoutsTable } = require("./utilities/delete-workouts-table");

const { DYNAMO_DB_PORT, DYNAMO_DB_CREATE_DROP, DYNAMO_DB_WORKOUTS_TABLE_NAME } = process.env;

const developmentSetup = async () => {
  const dynamoDBClient = new DynamoDBClient({ endpoint: `http://localhost:${DYNAMO_DB_PORT}` });

  const { TableNames } = await dynamoDBClient.send(new ListTablesCommand({}));

  if (DYNAMO_DB_CREATE_DROP === "true" && TableNames.includes(DYNAMO_DB_WORKOUTS_TABLE_NAME)) {
    await deleteWorkoutsTable(dynamoDBClient);
    await createWorkoutsTable(dynamoDBClient);
  } else if (!TableNames.includes(DYNAMO_DB_WORKOUTS_TABLE_NAME)) {
    await createWorkoutsTable(dynamoDBClient);
  }
};

developmentSetup().catch((err) => {
  console.error("An error occurred setting up development mode", err);
});
