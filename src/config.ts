import dotenv from 'dotenv';

switch (process.env.NODE_ENV) {
    case 'test':
        dotenv.config({ path: '.env.test' });
        break;
    default:
        dotenv.config();
}

const config = {
    SERVER_PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
};

export { config };
