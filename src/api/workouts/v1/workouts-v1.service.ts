import { Injectable } from "@nestjs/common";

import { Logger } from "../../../logging/logger";
import { WorkoutsRepository } from "../../../repository/workouts.repository";
import { WorkoutNotFoundException } from "../exceptions/workout-not-found-exception";
import { WorkoutV1Dto } from "../types/workout-v1.dto";
import { WorkoutsV1Mapper } from "./workouts-v1.mapper";

@Injectable()
class WorkoutsV1Service {
    private readonly logger = new Logger(WorkoutsV1Service.name);

    constructor(
        private readonly mapper: WorkoutsV1Mapper,
        private readonly repository: WorkoutsRepository,
    ) {}

    getWorkouts(): WorkoutV1Dto[] {
        this.logger.log("Retrieving all workouts");
        const workoutEntities = this.repository.findAll();

        const workouts = workoutEntities.map((workoutEntity) =>
            this.mapper.toWorkoutV1Dto(workoutEntity),
        );

        return workouts;
    }

    getWorkout(id: string): WorkoutV1Dto {
        this.logger.log(`Retrieving workout with id: ${id}`);
        const workoutEntity = this.repository.findById(id);

        if (!workoutEntity) {
            this.logger.error(`No workout found with id: ${id}`);
            throw new WorkoutNotFoundException();
        }

        return this.mapper.toWorkoutV1Dto(workoutEntity);
    }
}

export { WorkoutsV1Service };
