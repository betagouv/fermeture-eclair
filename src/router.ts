import express from 'express';
import Joi from 'joi';
import { buildController } from './lib/buildController';
import { dataSource } from './dataSource';
import { buildEventController } from './modules/event';
import { buildGithubTokenController } from './modules/githubToken';
import { alertHandler, buildAlertController } from './modules/alert';

export { router };

const router = express.Router();

const alertController = buildAlertController(dataSource);
const eventController = buildEventController(dataSource);
const githubTokenController = buildGithubTokenController(dataSource);

router.post(
    '/alert',
    buildController(alertController.handleAlert, {
        checkAuthorization: alertHandler.verifySignature,
    }),
);

router.get('/events', buildController(eventController.getAllEvents));

router.get('/github-token', buildController(githubTokenController.fetchAll));

router.post(
    '/github-token',
    buildController(githubTokenController.createOne, {
        schema: Joi.object({
            githubToken: Joi.string().required(),
            repositoryName: Joi.string().required(),
            repositoryOwner: Joi.string().required(),
        }),
    }),
);
