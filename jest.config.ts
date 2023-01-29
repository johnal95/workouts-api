import { Config } from "jest";

process.env.LOG_LEVEL = "silent";

const config: Config = {
    transform: {
        "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "test/tsconfig.json" }],
    },
    testRegex: ".*\\.test\\.ts$",
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.ts"],
    coverageDirectory: "../coverage",
};

export default config;
