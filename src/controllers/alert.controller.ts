import { alertHandlerUseCases, alertPayloadType } from '../useCases/alertHandler';
import { eventUseCases } from '../useCases/event';
import { githubTokenUseCases } from '../useCases/githubToken';
import { githubRepositoryHandler } from '../useCases/repositoryHandler';
import { signalUseCase } from '../useCases/signal';

export { alertController };

const alertController = {
    handleAlert: async (payload: alertPayloadType) => {
        console.log(payload);
        await eventUseCases.createEvent(
            alertHandlerUseCases.computeAlertMessage('alert-received', payload),
        );

        if (!alertHandlerUseCases.isAlertRelevant(payload)) {
            return;
        }

        const { owner, name } = alertHandlerUseCases.extractRepositoryInfo(payload);

        const githubToken = await githubTokenUseCases.getGithubToken({
            repositoryOwner: owner,
            repositoryName: name,
        });

        await githubRepositoryHandler.closeRepository({
            owner,
            name,
            githubToken,
        });
        await eventUseCases.createEvent(
            alertHandlerUseCases.computeAlertMessage('repository-closed', payload),
        );
        await signalUseCase.alertOnMattermost(payload);
    },
};
