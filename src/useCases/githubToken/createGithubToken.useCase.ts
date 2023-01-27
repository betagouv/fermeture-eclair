import { DataSource } from 'typeorm';
import { rsa } from '../../lib/rsa';
import { buildGithubTokenRepository } from '../../repositories';

export { buildCreateGithubToken };

function buildCreateGithubToken(dataSource: DataSource) {
    const githubTokenRepository = buildGithubTokenRepository(dataSource);

    return createGithubToken;

    async function createGithubToken({
        githubToken,
        repositoryName,
        repositoryOwner,
    }: {
        githubToken: string;
        repositoryName: string;
        repositoryOwner: string;
    }) {
        const encryptedToken = rsa.encrypt(githubToken);

        await githubTokenRepository.insertOne({
            encryptedToken,
            repositoryName,
            repositoryOwner,
        });
        return true;
    }
}
