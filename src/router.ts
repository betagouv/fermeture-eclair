import express, { Request, Response } from 'express';
import { githubHandler } from './lib/githubHandler';

export { router };

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
    res.sendStatus(200);
});

router.get('/handle-incident', async (_: Request, res: Response) => {
    await githubHandler.closeRepository({
        owner: 'BenoitSerrano',
        repository: 'chronodose-finder',
    });
    res.sendStatus(200);
});
