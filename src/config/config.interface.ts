export interface IConfig {
  BACKEND_PORT: number;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRATION_TIME: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRATION_TIME: string;
  EMAIL_SERVICE: string;
  EMAIL_USER: string;
  EMAIL_PASSWORD: string;
}
