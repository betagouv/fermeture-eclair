import { DataSource } from 'typeorm';
import { buildEventService } from '../event';
import { githubRepositoryHandler } from '../../lib/githubRepositoryHandler';
import { buildGithubTokenService } from '../githubToken';
import { alertHandler, alertPayloadType } from './lib';

export { buildAlertController };

function buildAlertController(dataSource: DataSource) {
    const eventService = buildEventService(dataSource);
    const githubTokenService = buildGithubTokenService(dataSource);

    const alertController = {
        handleAlert: async (payload: alertPayloadType) => {
            await eventService.insertOne(
                alertHandler.computeAlertMessage('alert-received', payload),
            );

            if (!alertHandler.isAlertRelevant(payload)) {
                return;
            }

            await alertHandler.alertOnMattermost(payload);

            const { owner, name } = alertHandler.extractRepositoryInfo(payload);

            const githubToken = await githubTokenService.findOne({
                repositoryOwner: owner,
                repositoryName: name,
            });

            await githubRepositoryHandler.closeRepository({
                owner,
                name,
                githubToken,
            });
            await eventService.insertOne(
                alertHandler.computeAlertMessage('repository-closed', payload),
            );
        },
    };

    return alertController;
}
