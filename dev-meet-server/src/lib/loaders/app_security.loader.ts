import { INestApplication } from "@nestjs/common";
import helmet from "helmet";

export function AppSecurityLoader(app: INestApplication) {

    // set secure HTTP headers 
    app.use(helmet());

    // Optionally: Add other security middlewares like CSRF, rate-limiting, etc.
}