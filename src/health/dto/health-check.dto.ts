import { ApiProperty } from "@nestjs/swagger";
import { HealthStatus } from "../health-status";

class HealthCheckDto {
    @ApiProperty({ example: "workouts-api" })
    readonly application!: string;

    @ApiProperty({ enum: HealthStatus })
    readonly status!: HealthStatus;

    @ApiProperty({ example: "2023-01-25T15:30:00.000Z" })
    readonly startupTime!: string;

    @ApiProperty({ example: "2023-01-25T15:30:00.000Z" })
    readonly lastCheckTime!: string;

    private constructor() {}
}

export { HealthCheckDto };
