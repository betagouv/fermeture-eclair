import { Octokit } from '@octokit/core';
import httpStatus from 'http-status';
import { routeType } from './buildController';

export { githubHandler };

const githubHandler = {
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
}): Promise<routeType> {
    const octokit = new Octokit({ auth: githubToken });

    try {
        const response = await octokit.request('PATCH /repos/{owner}/{repo}', {
            owner,
            repo: name,
            private: true,
        });
        if (response.status == 200) {
            return {
                kind: 'success' as const,
                data: 'Le repository a bien été fermé',
            };
        }
        return {
            kind: 'error' as const,
            statusCode: response.status,
            message: "Le repository n'a pas été fermé",
        };
    } catch (error) {
        console.warn(error);
        return {
            kind: 'error' as const,
            message: JSON.stringify(error, null, 2),
            statusCode: httpStatus.BAD_REQUEST,
        };
    }
}
