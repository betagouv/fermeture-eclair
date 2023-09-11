import { DataSource } from 'typeorm';
import { buildEventService } from '../event';
import { githubRepositoryHandler } from '../../lib/githubRepositoryHandler';
import { buildGithubTokenService } from '../githubToken';
import { alertHandler, alertPayloadType } from './lib';
import { buildIncidentService } from '../incident/incident.service';

export { buildAlertController };

function buildAlertController(dataSource: DataSource) {
    const eventService = buildEventService(dataSource);
    const githubTokenService = buildGithubTokenService(dataSource);
    const incidentService = buildIncidentService(dataSource);

    const alertController = {
        handleAlert: async (payload: alertPayloadType) => {
            await eventService.insertOne(
                alertHandler.computeAlertMessage('alert-received', payload),
            );

            if (!alertHandler.isAlertRelevant(payload)) {
                console.log(`Alert not relevant.`);
                return;
            }

            const gitGuardianId = payload.incident.id;

            const hasIncidentBeenRegistered = await incidentService.hasBeenRegistered(
                gitGuardianId,
            );

            if (hasIncidentBeenRegistered) {
                console.log(`Incident ${gitGuardianId} has already been registered.`);
                return;
            }

            await alertHandler.alertOnMattermost(payload);

            await incidentService.insertOne(gitGuardianId);

            const { owner, name } = alertHandler.extractRepositoryInfo(payload);

            const githubToken = await githubTokenService.findOne({
                repositoryOwner: owner,
                repositoryName: name,
            });

            if (!githubToken) {
                console.log(`No github token has been found for repository ${owner}/${name}`);
                return;
            }

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
