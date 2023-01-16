import express, { Request, Response } from 'express';
import { buildController } from './lib/buildController';
import { githubHandler } from './lib/githubHandler';

export { router };

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
    res.sendStatus(200);
});

router.post(
    '/handle-incident',
    buildController(async (params) => {
        console.log(params);
        await githubHandler.closeRepository({
            owner: 'BenoitSerrano',
            repository: 'chronodose-finder',
        });
        return { kind: 'success', data: 'Le repository a bien été fermé' };
    }),
);
