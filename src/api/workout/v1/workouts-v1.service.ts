import { Injectable } from "@nestjs/common";

import { WorkoutsRepository } from "../common/workouts.repository";
import { WorkoutNotFoundException } from "../exceptions/workout-not-found-exception";
import { WorkoutV1Dto } from "../types/workout-v1.dto";
import { WorkoutsV1Mapper } from "./workouts-v1.mapper";

@Injectable()
class WorkoutsV1Service {
    constructor(
        private readonly mapper: WorkoutsV1Mapper,
        private readonly repository: WorkoutsRepository,
    ) {}

    getWorkouts(): WorkoutV1Dto[] {
        const workoutEntities = this.repository.findAll();

        const workouts = workoutEntities.map((workoutEntity) =>
            this.mapper.toWorkoutV1Dto(workoutEntity),
        );

        return workouts;
    }

    getWorkout(id: string): WorkoutV1Dto {
        const workoutEntity = this.repository.findById(id);

        if (!workoutEntity) throw new WorkoutNotFoundException();

        return this.mapper.toWorkoutV1Dto(workoutEntity);
    }
}

export { WorkoutsV1Service };
