import { LogLevel } from "../logging/types/log-level";

type NodeEnv = "development" | "production";

class Config {
    static readonly NODE_ENV: NodeEnv = this.getNodeEnv();
    static readonly PORT: number = this.getEnvironmentPort();
    static readonly LOG_LEVEL: LogLevel = this.getEnvironmentLogLevel();

    private static getNodeEnv(): NodeEnv {
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
}

export { Config };
