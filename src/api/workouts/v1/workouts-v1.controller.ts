import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiNotFoundResponse, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ErrorResponseDto } from "../../../exceptions/error-response.dto";
import { SchemaValidationPipe } from "../../../pipes/schema-validation.pipe";
import { CreateWorkoutV1Dto } from "../dto/create-workout-v1.dto";
import { WorkoutV1Dto } from "../dto/workout-v1.dto";
import { CreateWorkoutV1Schema } from "../schema/create-workout-v1.schema";
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
    @ApiNotFoundResponse({ type: ErrorResponseDto })
    getWorkout(@Param("id") id: string): WorkoutV1Dto {
        return this.service.getWorkout(id);
    }

    @Post()
    @ApiOperation({ summary: "Add new workout" })
    @ApiResponse({ status: 201, type: WorkoutV1Dto })
    addNewWorkout(
        @Body(new SchemaValidationPipe(CreateWorkoutV1Schema)) workout: CreateWorkoutV1Dto,
    ): WorkoutV1Dto {
        return this.service.addNewWorkout(workout);
    }
}

export { WorkoutsV1Controller };
