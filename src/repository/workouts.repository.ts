import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

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

    save(workoutName: string): WorkoutEntity {
        const workout: WorkoutEntity = {
            id: uuidv4(),
            name: workoutName,
            createdAt: Date.now(),
        };

        inMemoryWorkouts[workout.id] = workout;

        return workout;
    }

    update(workout: WorkoutEntity): WorkoutEntity {
        inMemoryWorkouts[workout.id] = workout;

        return workout;
    }

    deleteById(id: string): void {
        delete inMemoryWorkouts[id];
    }
}

export { WorkoutsRepository };
