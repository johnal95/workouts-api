import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { ApiModule } from "./api/api.module";
import { AccessLogger } from "./logging/access-logger";

@Module({
    imports: [ApiModule],
})
class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AccessLogger).forRoutes("*");
    }
}

export { AppModule };
