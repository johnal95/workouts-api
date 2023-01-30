import { HttpException } from "@nestjs/common";
import { StatusCodes } from "http-status-codes";

class NoSuchWorkoutException extends HttpException {
    constructor() {
        super("Workout not found", StatusCodes.NOT_FOUND, {
            description: "workout resource not found",
        });
    }
}

export { NoSuchWorkoutException };
