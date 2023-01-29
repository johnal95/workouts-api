import { ApiProperty } from "@nestjs/swagger";

class WorkoutV1Dto {
    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly name: string;

    private constructor() {}
}

export { WorkoutV1Dto };
