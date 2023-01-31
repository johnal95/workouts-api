import { ApiProperty } from "@nestjs/swagger";

class UpdateWorkoutV1Dto {
    @ApiProperty()
    readonly name!: string;

    private constructor() {}
}

export { UpdateWorkoutV1Dto };
