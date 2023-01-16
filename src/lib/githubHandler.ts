import { Octokit } from '@octokit/core';
import { config } from '../config';

export { githubHandler };

const githubHandler = buildGithubHandler();

function buildGithubHandler() {
    const octokit = new Octokit({ auth: config.GITHUB_TOKEN });

    return {
        closeRepository,
    };

    async function closeRepository({ owner, repository }: { owner: string; repository: string }) {
        try {
            const response = await octokit.request('PATCH /repos/{owner}/{repo}', {
                owner,
                repo: repository,
                private: true,
            });
            console.log(response);
            return response;
        } catch (error) {
            console.warn(error);
        }
    }
}
