import { Module } from "@nestjs/common";

import { WorkoutsMapper } from "../../repository/workouts/workouts.mapper";
import { WorkoutsRepository } from "../../repository/workouts/workouts.repository";
import { WorkoutsV1Controller } from "./v1/workouts-v1.controller";
import { WorkoutsV1Mapper } from "./v1/workouts-v1.mapper";
import { WorkoutsV1Service } from "./v1/workouts-v1.service";

@Module({
    controllers: [WorkoutsV1Controller],
    providers: [WorkoutsMapper, WorkoutsRepository, WorkoutsV1Service, WorkoutsV1Mapper],
})
class WorkoutsModule {}

export { WorkoutsModule };
