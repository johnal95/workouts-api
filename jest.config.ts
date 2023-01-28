import { Config } from "jest";

process.env.LOG_LEVEL = "silent";

const config: Config = {
    rootDir: "test",
    preset: "ts-jest",
    testRegex: ".*\\.test\\.ts$",
    testEnvironment: "node",
    collectCoverageFrom: ["**/*.ts"],
    coverageDirectory: "../coverage",
};

export default config;
