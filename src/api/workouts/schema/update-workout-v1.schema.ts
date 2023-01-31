import * as Joi from "joi";

import { UpdateWorkoutV1Dto } from "../dto/update-workout-v1.dto";

const UpdateWorkoutV1Schema = Joi.object<UpdateWorkoutV1Dto>({
    name: Joi.string().required(),
});

export { UpdateWorkoutV1Schema };
