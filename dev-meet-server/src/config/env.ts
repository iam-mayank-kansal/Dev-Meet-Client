import { IsEnum, IsNumber, IsString } from "class-validator";
import { NODE_ENVIRONMENT } from "src/lib/contants/enum";

export class EnvironmentVariables {
  // ******************** >>> Common Configuration <<< ***********************
  @IsEnum(NODE_ENVIRONMENT)
  NODE_ENV: String;

  @IsNumber({}, { message: 'Invalid APP_PORT' })
  APP_PORT: number;

  @IsString({ message: 'Invalid APP_ROUTE_PREFIX' })
  APP_ROUTE_PREFIX: string;

  // ******************** >>> Database Configuration <<< **********************

  @IsString({ message: 'Invalid MONGO_URI' })
  MONGO_URI: string;

  // ******************** >>> Swagger Configuration <<< **********************

  @IsString({ message: 'Invalid SWAGGER_PATH' })
  SWAGGER_PATH: string;
}
