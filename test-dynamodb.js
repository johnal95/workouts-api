require("dotenv/config");
const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

process.env.AWS_ACCESS_KEY_ID = "MOCK_AWS_ACCESS_KEY_ID";
process.env.AWS_SECRET_ACCESS_KEY = "MOCK_AWS_SECRET_ACCESS_KEY";
process.env.AWS_REGION = "us-east-1";

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
