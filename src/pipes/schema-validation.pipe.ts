import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { ObjectSchema } from "joi";

@Injectable()
class SchemaValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    transform(value: unknown): unknown {
        const { error } = this.schema.validate(value);

        if (error) throw new BadRequestException(error.message);

        return value;
    }
}

export { SchemaValidationPipe };
