import { Injectable } from "@nestjs/common";

import { WorkoutEntity } from "../../../repository/types/workout.entity";
import { WorkoutV1Dto } from "../dto/workout-v1.dto";

@Injectable()
class WorkoutsV1Mapper {
    toWorkoutV1Dto = (workout: WorkoutEntity): WorkoutV1Dto => ({
        id: workout.id,
        name: workout.name,
    });

    toWorkoutV1DtoList = (workouts: WorkoutEntity[]): WorkoutV1Dto[] =>
        workouts.map(this.toWorkoutV1Dto);
}

export { WorkoutsV1Mapper };
