import { alertPayloadType } from './types';

export { extractRepositoryInfo };

function extractRepositoryInfo(payload: alertPayloadType) {
    const url = new URL(payload.occurrence.source.url);
    const [_, owner, name] = url.pathname.split('/');

    return {
        name,
        owner,
    };
}
