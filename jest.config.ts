import "dotenv/config";
import { JestConfigWithTsJest } from "ts-jest";

process.env.LOG_LEVEL = "silent";

process.env.AWS_ACCESS_KEY_ID = "MOCK_AWS_ACCESS_KEY_ID";
process.env.AWS_SECRET_ACCESS_KEY = "MOCK_AWS_SECRET_ACCESS_KEY";
process.env.AWS_REGION = "us-east-1";

process.env.DYNAMO_DB_WORKOUTS_TABLE_NAME = "test-workouts-table";

const config: JestConfigWithTsJest = {
    transform: {
        "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "test/tsconfig.json" }],
    },
    testRegex: ".*\\.test\\.ts$",
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.ts"],
    coverageDirectory: "coverage",
};

export default config;
