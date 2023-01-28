import { Injectable } from "@nestjs/common";

import { WorkoutV1Dto } from "../types/workout-v1.dto";
import { WorkoutEntity } from "../types/workout.entity";

@Injectable()
class WorkoutsV1Mapper {
    toWorkoutV1Dto(workout: WorkoutEntity): WorkoutV1Dto {
        return {
            id: workout.id,
            name: workout.name,
        };
    }
}

export { WorkoutsV1Mapper };
