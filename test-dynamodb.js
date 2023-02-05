const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

(async () => {
  try {
    const client = new DynamoDBClient({
      endpoint: `http://localhost:${process.env.DYNAMO_DB_PORT}`,
    });

    const { TableNames } = await client.send(new ListTablesCommand({}));

    console.info("Table names:", TableNames);
  } catch (err) {
    console.error("An error occurred:", err);
  }
})();
