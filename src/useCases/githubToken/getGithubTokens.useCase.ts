import { DataSource } from 'typeorm';
import { buildGithubTokenRepository } from '../../repositories';

export { buildGetGithubTokens };

function buildGetGithubTokens(dataSource: DataSource) {
    const githubTokenRepository = buildGithubTokenRepository(dataSource);

    return getGithubTokens;

    async function getGithubTokens() {
        const githubTokens = await githubTokenRepository.findAll();

        return githubTokens.map(({ repositoryName, repositoryOwner }) => ({
            repositoryName,
            repositoryOwner,
        }));
    }
}
