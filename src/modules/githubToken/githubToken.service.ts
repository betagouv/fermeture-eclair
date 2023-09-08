import { DataSource } from 'typeorm';
import { GithubToken } from './GithubToken.entity';
import { rsa } from '../../lib/rsa';
import { githubRepositoryHandler } from '../../lib/githubRepositoryHandler';

export { buildGithubTokenService };

function buildGithubTokenService(dataSource: DataSource) {
    const repository = dataSource.getRepository(GithubToken);

    return { findAll, findOne, insertOne };

    async function insertOne({
        githubToken,
        repositoryName,
        repositoryOwner,
    }: {
        githubToken: string;
        repositoryName: string;
        repositoryOwner: string;
    }): Promise<boolean> {
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

        const result = await repository.insert({
            encryptedToken,
            repositoryName,
            repositoryOwner,
        });
        return result.identifiers.length == 1;
    }

    async function findAll() {
        const githubTokens = await repository.find();
        return githubTokens.map(({ repositoryName, repositoryOwner }) => ({
            repositoryName,
            repositoryOwner,
        }));
    }

    async function findOne(
        githubTokenDto: Pick<GithubToken, 'repositoryName' | 'repositoryOwner'>,
    ) {
        const { encryptedToken } = await repository.findOneOrFail({
            where: {
                repositoryName: githubTokenDto.repositoryName,
                repositoryOwner: githubTokenDto.repositoryOwner,
            },
        });

        const githubToken = rsa.decrypt(encryptedToken);

        return githubToken;
    }
}
