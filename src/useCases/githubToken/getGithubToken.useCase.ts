import { DataSource } from 'typeorm';
import { rsa } from '../../lib/rsa';
import { buildGithubTokenRepository } from '../../repositories';

export { buildGetGithubToken };

function buildGetGithubToken(dataSource: DataSource) {
    const githubTokenRepository = buildGithubTokenRepository(dataSource);

    return getGithubToken;

    async function getGithubToken({
        repositoryName,
        repositoryOwner,
    }: {
        repositoryName: string;
        repositoryOwner: string;
    }) {
        const { encryptedToken } = await githubTokenRepository.findOne({
            repositoryName,
            repositoryOwner,
        });

        const githubToken = rsa.decrypt(encryptedToken);

        return githubToken;
    }
}
