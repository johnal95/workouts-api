import { Injectable } from "@nestjs/common";

import { Logger } from "../../../logging/logger";
import { WorkoutsRepository } from "../../../repository/workouts/workouts.repository";
import { NoSuchWorkoutException } from "../exceptions/no-such-workout-exception";
import { CreateWorkoutV1Dto } from "../dto/create-workout-v1.dto";
import { WorkoutV1Dto } from "../dto/workout-v1.dto";
import { UpdateWorkoutV1Dto } from "../dto/update-workout-v1.dto";
import { WorkoutsV1Mapper } from "./workouts-v1.mapper";

@Injectable()
class WorkoutsV1Service {
    private readonly logger = new Logger(WorkoutsV1Service.name);

    constructor(
        private readonly mapper: WorkoutsV1Mapper,
        private readonly repository: WorkoutsRepository,
    ) {}

    async getWorkouts(): Promise<WorkoutV1Dto[]> {
        this.logger.debug("Retrieving all workouts");
        const workoutEntities = await this.repository.findAll();

        return this.mapper.toWorkoutV1DtoList(workoutEntities);
    }

    getWorkout(id: string): WorkoutV1Dto {
        this.logger.info(`Retrieving workout with id: ${id}`);
        const workoutEntity = this.repository.findById(id);

        if (!workoutEntity) {
            this.logger.error(`No workout found with id: ${id}`);
            throw new NoSuchWorkoutException();
        }

        return this.mapper.toWorkoutV1Dto(workoutEntity);
    }

    addNewWorkout(workout: CreateWorkoutV1Dto): WorkoutV1Dto {
        this.logger.info("Saving workout");
        const workoutEntity = this.repository.save(workout.name);

        return this.mapper.toWorkoutV1Dto(workoutEntity);
    }

    async updateWorkout(id: string, workout: UpdateWorkoutV1Dto): Promise<WorkoutV1Dto> {
        this.logger.info(`Retrieving workout with id: ${id}`);
        const workoutEntity = this.repository.findById(id);

        if (!workoutEntity) {
            this.logger.error(`No workout found with id: ${id}`);
            throw new NoSuchWorkoutException();
        }

        const updatedWorkoutEntity = { ...workoutEntity, ...workout };

        await this.repository.update(updatedWorkoutEntity);

        return this.mapper.toWorkoutV1Dto(updatedWorkoutEntity);
    }

    async deleteWorkout(id: string): Promise<void> {
        this.logger.info(`Retrieving workout with id: ${id}`);
        const workoutEntity = this.repository.findById(id);

        if (!workoutEntity) {
            this.logger.error(`No workout found with id: ${id}`);
            throw new NoSuchWorkoutException();
        }

        await this.repository.deleteById(id);
    }
}

export { WorkoutsV1Service };
