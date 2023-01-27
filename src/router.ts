import express from 'express';
import Joi from 'joi';
import { githubTokenController } from './controllers';
import { buildController } from './lib/buildController';
import { githubHandler } from './lib/githubHandler';
import { alertPayloadType, alertHandler } from './modules';
import { githubTokenUseCases } from './useCases/githubToken';

export { router };

const router = express.Router();

router.post(
    '/handle-incident',
    buildController(
        async (payload: alertPayloadType) => {
            const { owner, name } = alertHandler.extractRepositoryInfo(payload);

            const githubToken = await githubTokenUseCases.getGithubToken({
                repositoryOwner: owner,
                repositoryName: name,
            });

            return githubHandler.closeRepository({
                owner,
                name,
                githubToken,
            });
        },
        { authentication: 'signature' },
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
        authentication: 'none',
    }),
);
