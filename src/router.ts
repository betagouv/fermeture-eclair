import express from 'express';
import Joi from 'joi';
import { alertController, githubTokenController } from './controllers';
import { buildController } from './lib/buildController';
import { alertHandlerUseCases, alertPayloadType } from './useCases/alertHandler';
import { githubTokenUseCases } from './useCases/githubToken';
import { githubRepositoryHandler } from './useCases/repositoryHandler';

export { router };

const router = express.Router();

router.post(
    '/alert',
    buildController(alertController.handleAlert, {
        checkAuthorization: alertHandlerUseCases.verifySignature,
    }),
);

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
