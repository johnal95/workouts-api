import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { HealthCheckDto } from "./dto/health-check.dto";
import { HealthStatus } from "./health-status";

@ApiTags("Health Check Controller")
@Controller({
    path: "healthcheck",
})
class HealthCheckController {
    private readonly startupTime = new Date().toISOString();

    @Get()
    @ApiOperation({ summary: "Health check endpoint" })
    @ApiOkResponse({ type: HealthCheckDto })
    getHealthCheck(): HealthCheckDto {
        return {
            application: "workouts-api",
            status: HealthStatus.HEALTHY,
            startupTime: this.startupTime,
            lastCheckTime: new Date().toISOString(),
        };
    }
}

export { HealthCheckController };
