import Ajv from "ajv";

import { UpdateWorkoutV1Dto } from "../dto/update-workout-v1.dto";

const UpdateWorkoutV1Schema = new Ajv().compile<UpdateWorkoutV1Dto>({
    type: "object",
    properties: {
        name: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
});

export { UpdateWorkoutV1Schema };
