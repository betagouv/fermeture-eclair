import { DataSource } from 'typeorm';
import { rsa } from '../../lib/rsa';
import { buildGithubTokenRepository } from '../../repositories';
import { githubRepositoryHandler } from '../repositoryHandler';

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
        const isTokenValid = githubRepositoryHandler.isTokenValid(githubToken, {
            owner: repositoryOwner,
            name: repositoryName,
        });
        if (!isTokenValid) {
            throw new Error(
                `Le token fourni ne permet pas de consulter le repository ${repositoryOwner}/${repositoryName}`,
            );
        }
        const encryptedToken = rsa.encrypt(githubToken);

        await githubTokenRepository.insertOne({
            encryptedToken,
            repositoryName,
            repositoryOwner,
        });
        return true;
    }
}
