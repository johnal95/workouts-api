import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import {
    ApiOperation,
    ApiNotFoundResponse,
    ApiResponse,
    ApiTags,
    ApiBadRequestResponse,
} from "@nestjs/swagger";

import { ErrorResponseDto } from "../../../exceptions/error-response.dto";
import { SchemaValidationPipe } from "../../../pipes/schema-validation.pipe";
import { CreateWorkoutV1Dto } from "../dto/create-workout-v1.dto";
import { UpdateWorkoutV1Dto } from "../dto/update-workout-v1.dto";
import { WorkoutV1Dto } from "../dto/workout-v1.dto";
import { CreateWorkoutV1Schema } from "../schema/create-workout-v1.schema";
import { UpdateWorkoutV1Schema } from "../schema/update-workout-v1.schema";
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
    @ApiBadRequestResponse({ type: ErrorResponseDto })
    addNewWorkout(
        @Body(new SchemaValidationPipe(CreateWorkoutV1Schema)) workout: CreateWorkoutV1Dto,
    ): WorkoutV1Dto {
        return this.service.addNewWorkout(workout);
    }

    @Put(":id")
    @ApiOperation({ summary: "Update workout by ID" })
    @ApiResponse({ status: 200, type: WorkoutV1Dto })
    @ApiBadRequestResponse({ type: ErrorResponseDto })
    updateWorkout(
        @Param("id") id: string,
        @Body(new SchemaValidationPipe(UpdateWorkoutV1Schema)) workout: UpdateWorkoutV1Dto,
    ): WorkoutV1Dto {
        return this.service.updateWorkout(id, workout);
    }

    @Delete(":id")
    @HttpCode(204)
    @ApiOperation({ summary: "Delete workout by ID" })
    @ApiResponse({ status: 204 })
    @ApiBadRequestResponse({ type: ErrorResponseDto })
    deleteWorkout(@Param("id") id: string): void {
        this.service.deleteWorkout(id);
    }
}

export { WorkoutsV1Controller };
