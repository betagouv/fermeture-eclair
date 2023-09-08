import { extractRepositoryInfo } from './extractRepositoryInfo';
import { verifySignature } from './verifySignature';
import { isAlertRelevant } from './isAlertRelevant';
import { alertOnMattermost } from './alertOnMattermost';
import { computeAlertMessage } from './computeAlertMessage';
import { alertPayloadType } from './types';

export { alertHandler };
export type { alertPayloadType };

const alertHandler = {
    alertOnMattermost,
    extractRepositoryInfo,
    verifySignature,
    isAlertRelevant,
    computeAlertMessage,
};
