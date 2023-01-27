import { Octokit } from '@octokit/core';

export { githubRepositoryHandler };

const githubRepositoryHandler = {
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
