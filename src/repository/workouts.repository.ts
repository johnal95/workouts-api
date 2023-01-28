import { Injectable } from "@nestjs/common";

import { WorkoutEntity } from "./types/workout.entity";

const inMemoryWorkouts: Record<string, WorkoutEntity> = {
    "workout-1": {
        id: "workout-1",
        name: "First workout",
        createdAt: Date.now(),
    },
    "workout-2": {
        id: "workout-2",
        name: "Second workout",
        createdAt: Date.now(),
    },
};

@Injectable()
class WorkoutsRepository {
    findAll(): WorkoutEntity[] {
        return Object.values(inMemoryWorkouts);
    }

    findById(id: string): WorkoutEntity | null {
        return inMemoryWorkouts[id] ?? null;
    }
}

export { WorkoutsRepository };
