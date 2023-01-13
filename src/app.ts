import express, { Express } from 'express';
import bodyParser from 'body-parser';

import { router } from './router';

export { buildApp };

function buildApp() {
    const app: Express = express();

    app.use(bodyParser.json());

    app.use('/api', router);

    return app;
}
