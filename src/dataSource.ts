import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './config';
import { Event } from './modules/event';
import { GithubToken } from './modules/githubToken';
import { Incident } from './modules/incident';

export const dataSource = new DataSource({
    type: 'postgres',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    synchronize: false,
    logging: false,
    entities: [GithubToken, Event, Incident],
    migrations: ['dist/migration/*'],
    subscribers: [],
});
