import httpStatus from 'http-status';
import { routeType } from '../../lib/buildController';
import { githubTokenService } from './service';

export { githubTokenController };

async function createGithubToken(githubTokenDto: {
    githubToken: string;
    repositoryName: string;
    repositoryOwner: string;
    expirationDate: string;
}): Promise<routeType> {
    try {
        await githubTokenService.createGithubToken(githubTokenDto);
        return { kind: 'success' };
    } catch (error) {
        console.error(error);
        return {
            kind: 'error',
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'The githubToken insertion failed.',
        };
    }
}

const githubTokenController = {
    createGithubToken,
};
