import Ajv, { JSONSchemaType } from "ajv";

import { CreateWorkoutV1Dto } from "../dto/create-workout-v1.dto";

const createWorkoutV1Schema: JSONSchemaType<CreateWorkoutV1Dto> = {
    type: "object",
    properties: {
        name: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
};

const CreateWorkoutV1Schema = new Ajv().compile(createWorkoutV1Schema);

export { CreateWorkoutV1Schema };
