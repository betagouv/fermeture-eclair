import { extractRepositoryInfo } from './extractRepositoryInfo.useCase';
import { verifySignature } from './verifySignature.useCase';
import { isAlertRelevant } from './isAlertRelevant.useCase';
import { alertPayloadType } from './types';

export { alertHandlerUseCases };
export type { alertPayloadType };

const alertHandlerUseCases = { extractRepositoryInfo, verifySignature, isAlertRelevant };
