import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

class WorkoutsItemBuilder {
    private workoutId = uuidv4();

    private workoutName = "Default workout name";

    private createdAt = Date.now();

    withWorkoutId = (id: string): this => {
        this.workoutId = id;
        return this;
    };

    withWorkoutName = (name: string): this => {
        this.workoutName = name;
        return this;
    };

    withCreatedAt = (createdAt: number): this => {
        this.createdAt = createdAt;
        return this;
    };

    build = (): Record<string, AttributeValue> => ({
        WorkoutID: { S: this.workoutId },
        WorkoutName: { S: this.workoutName },
        CreatedAt: { N: String(this.createdAt) },
    });
}

const aWorkoutsItem = (): WorkoutsItemBuilder => new WorkoutsItemBuilder();

export { WorkoutsItemBuilder, aWorkoutsItem };
