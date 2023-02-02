import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const setupSwaggerModule = (app: INestApplication): void => {
    const config = new DocumentBuilder()
        .setTitle("Workouts API")
        .setDescription("An API for managing workout programs")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api/docs", app, document);
};

export { setupSwaggerModule };
