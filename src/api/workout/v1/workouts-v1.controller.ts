import { Controller, Get } from "@nestjs/common";

import { WorkoutV1Dto } from "../types/workout-v1.dto";
import { WorkoutsV1Service } from "./workouts-v1.service";

@Controller({
    path: "api/v1/workouts",
})
class WorkoutsV1Controller {
    constructor(private readonly service: WorkoutsV1Service) {}

    @Get()
    getWorkouts(): WorkoutV1Dto[] {
        return this.service.getWorkouts();
    }
}

export { WorkoutsV1Controller };
