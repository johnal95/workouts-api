import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";

import { WorkoutEntity } from "./types/workout.entity";

@Injectable()
class WorkoutsMapper {
    toEntities = (items: Record<string, AttributeValue>[]): WorkoutEntity[] =>
        items.map(this.toEntity);

    toEntity = (item: Record<string, AttributeValue>): WorkoutEntity => ({
        id: String(item.WorkoutID?.S),
        name: String(item.WorkoutName?.S),
        createdAt: Number(item.CreatedAt?.N),
    });
}

export { WorkoutsMapper };
