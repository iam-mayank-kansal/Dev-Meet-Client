import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { EnvironmentVariables } from "src/config/env";

export function SwaggerLoader(app:INestApplication,config : ConfigService<EnvironmentVariables>)
{
    const swaggerConfig = new DocumentBuilder()
    .setTitle("DevMeet API")
    .setDescription("API documentation for DevMeet application")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(config.get("SWAGGER_PATH") ?? "docs", app, document);
}