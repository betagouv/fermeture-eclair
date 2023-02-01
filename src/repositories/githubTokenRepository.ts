import { DataSource } from 'typeorm';
import { GithubToken } from '../models';

export { buildGithubTokenRepository };

function buildGithubTokenRepository(dataSource: DataSource) {
    const repository = dataSource.getRepository(GithubToken);

    return { findAll, findOne, insertOne };

    async function insertOne(
        githubTokenDto: Pick<GithubToken, 'encryptedToken' | 'repositoryName' | 'repositoryOwner'>,
    ): Promise<boolean> {
        const result = await repository.insert(githubTokenDto);
        return result.identifiers.length == 1;
    }

    async function findOne(
        githubTokenDto: Pick<GithubToken, 'repositoryName' | 'repositoryOwner'>,
    ) {
        const githubToken = await repository.findOneByOrFail(githubTokenDto);
        return githubToken;
    }

    async function findAll() {
        const githubTokens = await repository.find();
        return githubTokens;
    }
}
