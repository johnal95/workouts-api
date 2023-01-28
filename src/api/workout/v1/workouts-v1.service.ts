import { Injectable } from "@nestjs/common";

import { WorkoutsRepository } from "../common/workouts.repository";
import { WorkoutV1Dto } from "../types/workout-v1.dto";
import { WorkoutsV1Mapper } from "./workouts-v1.mapper";

@Injectable()
class WorkoutsV1Service {
    constructor(
        private readonly mapper: WorkoutsV1Mapper,
        private readonly repository: WorkoutsRepository,
    ) {}

    getWorkouts(): WorkoutV1Dto[] {
        const workoutEntities = this.repository.getWorkouts();

        const workouts = workoutEntities.map((workoutEntity) =>
            this.mapper.toWorkoutV1Dto(workoutEntity),
        );

        return workouts;
    }
}

export { WorkoutsV1Service };
