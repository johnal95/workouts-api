import Ajv, { JSONSchemaType } from "ajv";

import { UpdateWorkoutV1Dto } from "../dto/update-workout-v1.dto";

const updateWorkoutV1Schema: JSONSchemaType<UpdateWorkoutV1Dto> = {
    type: "object",
    properties: {
        name: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
};

const UpdateWorkoutV1Schema = new Ajv().compile(updateWorkoutV1Schema);

export { UpdateWorkoutV1Schema };
