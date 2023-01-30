import * as Joi from "joi";

import { CreateWorkoutV1Dto } from "../dto/create-workout-v1.dto";

const CreateWorkoutV1Schema = Joi.object<CreateWorkoutV1Dto>({
    name: Joi.string().required(),
});

export { CreateWorkoutV1Schema };
