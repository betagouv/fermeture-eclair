import { dataSource } from '../../dataSource';
import { buildCreateGithubToken } from './createGithubToken.useCase';
import { buildGetGithubToken } from './getGithubToken.useCase';

export { githubTokenUseCases };

const createGithubToken = buildCreateGithubToken(dataSource);
const getGithubToken = buildGetGithubToken(dataSource);

const githubTokenUseCases = { createGithubToken, getGithubToken };
