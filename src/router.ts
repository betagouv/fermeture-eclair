import express from 'express';
import Joi from 'joi';
import { githubTokenController } from './controllers';
import { buildController } from './lib/buildController';
import { alertHandlerUseCases, alertPayloadType } from './useCases/alertHandler';
import { githubTokenUseCases } from './useCases/githubToken';
import { githubRepositoryHandler } from './useCases/repositoryHandler';

export { router };

const router = express.Router();

router.post(
    '/handle-incident',
    buildController(
        async (payload: alertPayloadType) => {
            const { owner, name } = alertHandlerUseCases.extractRepositoryInfo(payload);

            const githubToken = await githubTokenUseCases.getGithubToken({
                repositoryOwner: owner,
                repositoryName: name,
            });

            return githubRepositoryHandler.closeRepository({
                owner,
                name,
                githubToken,
            });
        },
        { checkAuthorization: alertHandlerUseCases.verifySignature },
    ),
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
