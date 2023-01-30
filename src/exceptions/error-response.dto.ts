import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiProperty } from "@nestjs/swagger";

class ErrorResponseDto {
    @ApiProperty({ example: StatusCodes.BAD_REQUEST })
    readonly statusCode!: number;

    @ApiProperty({ example: ReasonPhrases.BAD_REQUEST })
    readonly error!: string;

    @ApiProperty()
    readonly message!: string;

    @ApiProperty({ example: "2023-01-25T15:30:00.000Z" })
    readonly timestamp!: string;

    private constructor() {}
}

export { ErrorResponseDto };
