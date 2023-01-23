import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { router } from './router';

export { buildApp };

function buildApp() {
    const app: Express = express();

    app.use(bodyParser.json());

    app.use(cors({ origin: 'http://localhost:3000' }));

    app.use('/api', router);

    return app;
}
