import { Injectable } from "@nestjs/common";

import { WorkoutEntity } from "../../../repository/types/workout.entity";
import { WorkoutV1Dto } from "../types/workout-v1.dto";

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
