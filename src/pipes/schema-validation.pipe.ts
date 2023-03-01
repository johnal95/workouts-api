import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { ValidateFunction } from "ajv";

@Injectable()
class SchemaValidationPipe implements PipeTransform {
    constructor(private validateSchema: ValidateFunction) {}

    transform(value: unknown): unknown {
        const isValid = this.validateSchema(value);

        if (!isValid) throw new BadRequestException(this.resolveErrorMessage());

        return value;
    }

    private resolveErrorMessage(): string | undefined {
        const [error] = this.validateSchema.errors ?? [];
        return error ? error.message : undefined;
    }
}

export { SchemaValidationPipe };
