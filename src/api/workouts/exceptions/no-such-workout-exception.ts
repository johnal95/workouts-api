import { HttpException, HttpStatus } from "@nestjs/common";

class NoSuchWorkoutException extends HttpException {
    constructor() {
        super("Workout not found", HttpStatus.NOT_FOUND, {
            description: "workout resource not found",
        });
    }
}

export { NoSuchWorkoutException };
