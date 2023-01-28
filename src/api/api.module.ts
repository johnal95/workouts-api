import { Module } from "@nestjs/common";

import { WorkoutsModule } from "./workout/workouts.module";

@Module({
    imports: [WorkoutsModule],
})
class ApiModule {}

export { ApiModule };
