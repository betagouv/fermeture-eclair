import dotenv from 'dotenv';
import pgConnectionString from 'pg-connection-string';

switch (process.env.NODE_ENV) {
    case 'test':
        dotenv.config({ path: '.env.test' });
        break;
    default:
        dotenv.config();
}

let databaseConfig: Record<string, string> = {};

if (process.env.DATABASE_URL) {
    const infos = pgConnectionString.parse(process.env.DATABASE_URL);
    databaseConfig.DATABASE_PORT = infos.port || '';
    databaseConfig.DATABASE_HOST = infos.host || '';
    databaseConfig.DATABASE_NAME = infos.database || '';
    databaseConfig.DATABASE_USER = infos.user || '';
    databaseConfig.DATABASE_PASSWORD = infos.password || '';
}

const config = {
    SERVER_PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    ENV: process.env.ENV || '',
    GIT_GUARDIAN_WEBHOOK_SIGNATURE: process.env.GIT_GUARDIAN_WEBHOOK_SIGNATURE || '',
    DATABASE_PORT: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 5432,
    DATABASE_HOST: process.env.DATABASE_HOST || '',
    DATABASE_NAME: process.env.DATABASE_NAME || '',
    DATABASE_USER: process.env.DATABASE_USER || '',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    MATTERMOST_HOOK_ID: process.env.MATTERMOST_HOOK_ID,
    GITHUB_TOKEN_ENCRYPTION_PUBLIC_KEY: process.env.GITHUB_TOKEN_ENCRYPTION_PUBLIC_KEY || '',
    GITHUB_TOKEN_ENCRYPTION_PRIVATE_KEY: process.env.GITHUB_TOKEN_ENCRYPTION_PRIVATE_KEY || '',
    ...databaseConfig,
};

export { config };
