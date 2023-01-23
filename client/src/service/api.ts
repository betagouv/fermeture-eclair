const api = {
    createGithubToken,
};

const BASE_URL = `http://localhost:3001/api/`;

function createGithubToken(body: {
    githubToken: string;
    expirationDate: string;
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
