import { Octokit } from '@octokit/core';

export { githubRepositoryHandler };

const githubRepositoryHandler = {
    isTokenValid,
    closeRepository,
};

async function closeRepository({
    owner,
    name,
    githubToken,
}: {
    owner: string;
    name: string;
    githubToken: string;
}) {
    const octokit = new Octokit({ auth: githubToken });

    const response = await octokit.request('PATCH /repos/{owner}/{repo}', {
        owner,
        repo: name,
        private: true,
    });
    if (response.status != 200) {
        console.error(response);
        throw new Error(`Le repository n'a pas été fermé: ${response.data}`);
    }
}

async function isTokenValid(
    githubToken: string,
    repositoryInfo: {
        owner: string;
        name: string;
    },
) {
    const octokit = new Octokit({ auth: githubToken });

    const response = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: repositoryInfo.owner,
        repo: repositoryInfo.name,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });

    return response.status == 200;
}
