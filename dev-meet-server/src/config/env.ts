export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  APP_PORT: number;
  APP_ROUTE_PREFIX: string;
  SWAGGER_PATH?: string;
  MONGO_URI: string;
}
