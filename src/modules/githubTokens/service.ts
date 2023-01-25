import { dataSource } from '../../dataSource';
import { rsa } from '../../lib/rsa';
import { GithubToken } from './entity';

export { githubTokenService };

const githubTokenService = {
    getGithubToken,
    createGithubToken,
};

async function getGithubToken({
    repositoryName,
    repositoryOwner,
}: {
    repositoryName: string;
    repositoryOwner: string;
}) {
    const githubTokenRepository = dataSource.getRepository(GithubToken);

    const { encryptedToken } = await githubTokenRepository.findOneByOrFail({
        repositoryName,
        repositoryOwner,
    });

    const githubToken = rsa.decrypt(encryptedToken);

    return githubToken;
}

async function createGithubToken({
    githubToken,
    repositoryName,
    repositoryOwner,
}: {
    githubToken: string;
    repositoryName: string;
    repositoryOwner: string;
}) {
    const githubTokenRepository = dataSource.getRepository(GithubToken);

    const encryptedToken = rsa.encrypt(githubToken);

    await githubTokenRepository.insert({
        encryptedToken,
        repositoryName,
        repositoryOwner,
    });
    return { kind: 'success' as const };
}
