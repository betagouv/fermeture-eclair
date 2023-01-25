import { config } from '../config';

const api = {
    createGithubToken,
};

const BASE_URL = `${config.API_URL}/api/`;

function createGithubToken(body: {
    githubToken: string;
    repositoryName: string;
    repositoryOwner: string;
}) {
    const URL = `${BASE_URL}github-token`;
    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' },
    });
}

export { api };
