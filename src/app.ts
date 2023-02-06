import express, { Express, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import { router } from './router';
import { config } from './config';

export { buildApp };

function buildApp() {
    const app: Express = express();

    app.use(bodyParser.json());

    if (config.ENV == 'local') {
        app.use(cors({ origin: 'http://localhost:3000' }));
    }

    app.use('/api', router);

    app.use(express.static(path.join(__dirname, '..', 'src', 'client', 'build')));

    app.get('*', (_, res: Response) => {
        res.sendFile(path.join(__dirname, '..', 'src', 'client', 'build', 'index.html'));
    });

    return app;
}
