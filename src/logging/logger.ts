import { LoggerService } from "@nestjs/common";
import {
    Logger as WinstonLogger,
    createLogger as createWinstonLogger,
    format as winstonFormat,
    transports as winstonTransports,
} from "winston";

import { Config } from "../config";

class Logger implements LoggerService {
    private delegate: WinstonLogger;

    constructor(loggerName: string) {
        this.delegate = createWinstonLogger({
            level: Config.LOG_LEVEL,
            transports: this.buildTransports(),
            defaultMeta: {
                loggerName,
            },
        });
    }

    debug(message: string, ...meta: unknown[]): void {
        this.delegate.debug(message, ...meta);
    }

    log(message: string, ...meta: unknown[]): void {
        this.delegate.info(message, ...meta);
    }

    warn(message: string, ...meta: unknown[]): void {
        this.delegate.warn(message, ...meta);
    }

    error(message: string, ...meta: unknown[]): void {
        this.delegate.error(message, ...meta);
    }

    private buildTransports() {
        return [
            new winstonTransports.Console({
                format: winstonFormat.combine(
                    this.upperCaseLevelFormat(),
                    winstonFormat.colorize({ level: true, message: true }),
                    winstonFormat.timestamp(),
                    winstonFormat.printf(
                        ({ loggerName, timestamp, level, message }) =>
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            `${timestamp} ${level} [${loggerName}] - ${message}`,
                    ),
                ),
            }),
        ];
    }

    private upperCaseLevelFormat = winstonFormat((info) => {
        info.level = info.level.toUpperCase();
        return info;
    });
}

export { Logger };
