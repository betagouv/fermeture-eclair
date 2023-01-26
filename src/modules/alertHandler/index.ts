import { extractRepositoryInfo, verifySignature, alertPayloadType } from './gitGuardian';

const alertHandler = {
    extractRepositoryInfo,
    verifySignature,
};

export { alertHandler };
export type { alertPayloadType };
