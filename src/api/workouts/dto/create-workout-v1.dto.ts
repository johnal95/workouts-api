import { ApiProperty } from "@nestjs/swagger";

class CreateWorkoutV1Dto {
    @ApiProperty()
    readonly name!: string;

    private constructor() {}
}

export { CreateWorkoutV1Dto };
