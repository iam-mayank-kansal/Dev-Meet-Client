import { ConfigModule as NestjsConfigModule } from "@nestjs/config"
import { EnvironmentVariables } from "./env"


export const ConfigModule = NestjsConfigModule.forRoot({
    isGlobal: true, // Makes the configuration available globally
    envFilePath: '.env', // Path to your .env file
    load: [() => EnvironmentVariables], // Load the EnvironmentVariables class to validate and provide configuration
})