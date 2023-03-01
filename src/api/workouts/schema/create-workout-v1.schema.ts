import Ajv from "ajv";

import { CreateWorkoutV1Dto } from "../dto/create-workout-v1.dto";

const CreateWorkoutV1Schema = new Ajv().compile<CreateWorkoutV1Dto>({
    type: "object",
    properties: {
        name: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
});

export { CreateWorkoutV1Schema };
