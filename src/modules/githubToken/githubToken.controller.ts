import { DataSource } from 'typeorm';
import { buildGithubTokenService } from './githubToken.service';

function buildGithubTokenController(dataSource: DataSource) {
    const githubTokenService = buildGithubTokenService(dataSource);

    return {
        fetchAll,
        createOne,
    };

    function fetchAll() {
        return githubTokenService.findAll();
    }

    function createOne(githubTokenDto: {
        githubToken: string;
        repositoryName: string;
        repositoryOwner: string;
    }) {
        return githubTokenService.insertOne(githubTokenDto);
    }
}

export { buildGithubTokenController };
