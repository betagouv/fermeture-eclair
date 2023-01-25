import express, { Request, Response } from 'express';
import Joi from 'joi';
import { DATE_PATTERN } from './constants';
import { buildController } from './lib/buildController';
import { githubHandler } from './lib/githubHandler';
import { githubTokenController } from './modules/githubTokens';
import { githubTokenService } from './modules/githubTokens/service';

export { router };

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
    res.sendStatus(200);
});

router.post(
    '/handle-incident',
    buildController(
        async (payload) => {
            console.log(payload);
            // Pour l'instant on le déclare, mais plus tard on l'extraiera de l'info du Git Guardian Web hook
            const repositoryOwner = 'BenoitSerrano';
            const repositoryName = 'chronodose-finder';
            const githubToken = await githubTokenService.getGithubToken({
                repositoryOwner,
                repositoryName,
            });

            return githubHandler.closeRepository({
                owner: repositoryOwner,
                repository: repositoryName,
                githubToken,
            });
        },
        { authentication: 'gitGuardianSignature' },
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

// 2023-01-17 01:01:40.888066480 +0100 CET [web-1] {
//     2023-01-17 01:01:40.888078165 +0100 CET [web-1] source: 'GitGuardian',
//     2023-01-17 01:01:40.888093043 +0100 CET [web-1] timestamp: '2023-01-17T00:01:40.320045Z',
//     2023-01-17 01:01:40.888093490 +0100 CET [web-1] action: 'incident_triggered',
//     2023-01-17 01:01:40.888093870 +0100 CET [web-1] message: 'A new incident has been detected.',
//     2023-01-17 01:01:40.888095944 +0100 CET [web-1] date: '2023-01-17T00:01:39.776066Z',
//     2023-01-17 01:01:40.888096218 +0100 CET [web-1] detector: null,
//     2023-01-17 01:01:40.888094813 +0100 CET [web-1] target_user: 'GitGuardian',
//     2023-01-17 01:01:40.888096567 +0100 CET [web-1] secret_hash: null,
//     2023-01-17 01:01:40.888096958 +0100 CET [web-1] secret_revoked: null,
//     2023-01-17 01:01:40.888179926 +0100 CET [web-1] status: 'triggered',
//     2023-01-17 01:01:40.888180332 +0100 CET [web-1] regression: false,
//     2023-01-17 01:01:40.888095220 +0100 CET [web-1] incident: {
//     2023-01-17 01:01:40.888180590 +0100 CET [web-1] assignee_email: null,
//     2023-01-17 01:01:40.888201050 +0100 CET [web-1] severity: 'unknown',
//     2023-01-17 01:01:40.888204362 +0100 CET [web-1] validity: null,
//     2023-01-17 01:01:40.888204919 +0100 CET [web-1] ignored_at: null,
//     2023-01-17 01:01:40.888205332 +0100 CET [web-1] ignore_reason: null,
//     2023-01-17 01:01:40.888095582 +0100 CET [web-1] id: 5508946,
//     2023-01-17 01:01:40.888205813 +0100 CET [web-1] resolved_at: null,
//     2023-01-17 01:01:40.888179234 +0100 CET [web-1] occurrence_count: 1,
//     2023-01-17 01:01:40.888223610 +0100 CET [web-1] gitguardian_url: 'https://dashboard.gitguardian.com/workspace/116918/incidents/5508946',
//     2023-01-17 01:01:40.888224008 +0100 CET [web-1] share_url: null
//     2023-01-17 01:01:40.888237270 +0100 CET [web-1] }
