import "dotenv/config";
import { JestConfigWithTsJest } from "ts-jest";

process.env.LOG_LEVEL = "silent";

process.env.AWS_ACCESS_KEY_ID = "MOCKxAWSxACCESSxKEYxID";
process.env.AWS_SECRET_ACCESS_KEY = "MOCKxAWSxSECRETxACCESSxKEY";
process.env.AWS_REGION = "us-east-1";

const config: JestConfigWithTsJest = {
    transform: {
        "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "test/tsconfig.json" }],
    },
    testRegex: ".*\\.test\\.ts$",
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.ts"],
    coverageDirectory: "coverage",
    maxWorkers: "50%",
};

export default config;
