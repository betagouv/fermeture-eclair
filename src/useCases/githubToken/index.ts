import { dataSource } from '../../dataSource';
import { buildCreateGithubToken } from './createGithubToken.useCase';
import { buildGetGithubToken } from './getGithubToken.useCase';
import { buildGetGithubTokens } from './getGithubTokens.useCase';

export { githubTokenUseCases };

const createGithubToken = buildCreateGithubToken(dataSource);
const getGithubToken = buildGetGithubToken(dataSource);
const getGithubTokens = buildGetGithubTokens(dataSource);

const githubTokenUseCases = { createGithubToken, getGithubToken, getGithubTokens };
