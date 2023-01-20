import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './config';
import {  GitToken } from './modules';

export const dataSource = new DataSource({
    type: 'postgres',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    synchronize: false,
    logging: false,
    entities: [GitToken],
    migrations: ['dist/migration/*'],
    subscribers: [],
});
