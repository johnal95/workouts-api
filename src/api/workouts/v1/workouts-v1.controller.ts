import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ReasonPhrases } from "http-status-codes";

import { WorkoutV1Dto } from "../dto/workout-v1.dto";
import { WorkoutsV1Service } from "./workouts-v1.service";

@ApiTags("workouts v1")
@Controller({
    path: "api/v1/workouts",
})
class WorkoutsV1Controller {
    constructor(private readonly service: WorkoutsV1Service) {}

    @Get()
    @ApiOperation({ summary: "Retrieve all workouts" })
    @ApiResponse({ status: 200, type: [WorkoutV1Dto] })
    getWorkouts(): WorkoutV1Dto[] {
        return this.service.getWorkouts();
    }

    @Get(":id")
    @ApiOperation({ summary: "Retrieve workout by ID" })
    @ApiResponse({ status: 200, type: WorkoutV1Dto })
    @ApiResponse({ status: 404, description: ReasonPhrases.NOT_FOUND })
    getWorkout(@Param("id") id: string): WorkoutV1Dto {
        return this.service.getWorkout(id);
    }
}

export { WorkoutsV1Controller };
