import { v4 as uuidv4 } from "uuid";

import { WorkoutEntity } from "../../src/repository/workouts/types/workout.entity";

class WorkoutEntityBuilder {
    private id = uuidv4();

    private name = "Default workout name";

    private createdAt = Date.now();

    withId = (id: string): this => {
        this.id = id;
        return this;
    };

    withName = (name: string): this => {
        this.name = name;
        return this;
    };

    withCreatedAt = (createdAt: number): this => {
        this.createdAt = createdAt;
        return this;
    };

    build = (): WorkoutEntity => ({
        id: this.id,
        name: this.name,
        createdAt: this.createdAt,
    });
}

const aWorkoutEntity = (): WorkoutEntityBuilder => new WorkoutEntityBuilder();

export { WorkoutEntityBuilder, aWorkoutEntity };
