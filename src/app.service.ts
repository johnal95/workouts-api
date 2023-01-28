import { Injectable } from "@nestjs/common";

@Injectable()
class AppService {
    getHello() {
        return "Hello World";
    }
}

export { AppService };
