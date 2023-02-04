import { LogLevel } from "../logging/types/log-level";

type NodeEnv = "development" | "production";

class Config {
    static readonly NODE_ENV: NodeEnv = this.getNodeEnvironment();

    static readonly PORT: number = this.getEnvironmentPort();
    static readonly LOG_LEVEL: LogLevel = this.getEnvironmentLogLevel();

    static readonly DYNAMO_DB_ENDPOINT?: string = this.getDynamoDbEndpoint();
    static readonly DYNAMO_DB_WORKOUTS_TABLE_NAME: string = this.getWorkoutsTableName();

    private static getNodeEnvironment(): NodeEnv {
        return process.env.NODE_ENV === "development" ? "development" : "production";
    }

    private static getEnvironmentPort(): number {
        return Number(process.env.PORT) || 8080;
    }

    private static getEnvironmentLogLevel(): LogLevel {
        return process.env.LOG_LEVEL === "debug" ||
            process.env.LOG_LEVEL === "info" ||
            process.env.LOG_LEVEL === "warn" ||
            process.env.LOG_LEVEL === "error" ||
            process.env.LOG_LEVEL === "silent"
            ? process.env.LOG_LEVEL
            : "debug";
    }

    private static getDynamoDbEndpoint(): string | undefined {
        return process.env.DYNAMO_DB_ENDPOINT;
    }

    private static getWorkoutsTableName(): string {
        return process.env.DYNAMO_DB_WORKOUTS_TABLE_NAME ?? "workouts-table";
    }
}

export { Config };
