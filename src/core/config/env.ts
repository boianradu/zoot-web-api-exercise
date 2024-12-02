import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    API_PREFIX: get('DEFAULT_API_PREFIX').default('/').asString(),
    NODE_ENV: get('NODE_ENV').default('development').asString(),

    // DB 
    DB_PORT: get('PORT').required().asPortNumber(),
    DB_HOST: get('DB_HOST').default('localhost').asString(),
    DB_USER: get('DB_USER').default('postgres').asString(),
    DB_PASS: get('DB_PASS').default('postgres').asString(),
    DB_NAME: get('DB_DATABASE').asString(),
    DB_URL: get('DATABASE_URL').asString(),

};