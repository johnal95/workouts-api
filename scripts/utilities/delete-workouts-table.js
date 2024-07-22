const { DynamoDBClient, DeleteTableCommand } = require("@aws-sdk/client-dynamodb");

const { DYNAMO_DB_WORKOUTS_TABLE_NAME } = process.env;

/** @param {DynamoDBClient} client */
const deleteWorkoutsTable = async (client) => {
    console.info(`Deleting existing table: '${DYNAMO_DB_WORKOUTS_TABLE_NAME}'`);
    await client.send(new DeleteTableCommand({ TableName: DYNAMO_DB_WORKOUTS_TABLE_NAME }));
};

module.exports = { deleteWorkoutsTable };
