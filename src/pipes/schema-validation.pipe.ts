import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { ValidateFunction } from "ajv";

@Injectable()
class SchemaValidationPipe implements PipeTransform {
    constructor(private validate: ValidateFunction) {}

    transform(value: unknown): unknown {
        const isValid = this.validate(value);

        if (!isValid) throw new BadRequestException(this.resolveErrorMessage());

        return value;
    }

    private resolveErrorMessage(): string | undefined {
        const [error] = this.validate.errors ?? [];
        return error ? error.message : undefined;
    }
}

export { SchemaValidationPipe };
