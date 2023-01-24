import express, { Express, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import { router } from './router';

export { buildApp };

function buildApp() {
    const app: Express = express();

    app.use(bodyParser.json());

    app.use(cors({ origin: 'http://localhost:3000' }));

    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('/front/*', (_, res: Response) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });

    app.use('/api', router);

    return app;
}
