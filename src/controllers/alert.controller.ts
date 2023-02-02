import { alertHandlerUseCases, alertPayloadType } from '../useCases/alertHandler';
import { eventUseCases } from '../useCases/event';
import { githubTokenUseCases } from '../useCases/githubToken';
import { githubRepositoryHandler } from '../useCases/repositoryHandler';

export { alertController };

const alertController = {
    handleAlert: async (payload: alertPayloadType) => {
        await eventUseCases.createEvent(payload);

        if (!alertHandlerUseCases.isAlertRelevant(payload)) {
            return;
        }

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
};
