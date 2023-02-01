import { githubTokenUseCases } from '../useCases/githubToken';

export { githubTokenController };

const githubTokenController = {
    createGithubToken: (githubDto: {
        githubToken: string;
        repositoryName: string;
        repositoryOwner: string;
    }) => githubTokenUseCases.createGithubToken(githubDto),
    fetchGithubTokens: () => githubTokenUseCases.getGithubTokens(),
};
