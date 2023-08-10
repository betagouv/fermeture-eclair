import express from 'express';
import Joi from 'joi';
import { alertController, eventController, githubTokenController } from './controllers';
import { buildController } from './lib/buildController';
import { alertHandlerUseCases } from './useCases/alertHandler';

export { router };

const router = express.Router();

router.post(
    '/alert',
    buildController(alertController.handleAlert, {
        checkAuthorization: alertHandlerUseCases.verifySignature,
    }),
);

router.get('/events', buildController(eventController.getEvents));

router.get('/github-token', buildController(githubTokenController.fetchGithubTokens));

router.post(
    '/github-token',
    buildController(githubTokenController.createGithubToken, {
        schema: Joi.object({
            githubToken: Joi.string().required(),
            repositoryName: Joi.string().required(),
            repositoryOwner: Joi.string().required(),
        }),
    }),
);
