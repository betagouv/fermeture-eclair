import { alertPayloadType } from './types';

type eventKindType = 'alert-received' | 'repository-closed';

function computeAlertMessage(eventKind: eventKindType, alertPayload: alertPayloadType) {
    switch (eventKind) {
        case 'alert-received':
            return `Une nouvelle alerte a été levée sur le dépôt ${alertPayload.occurrence.source.url}.`;
        case 'repository-closed':
            return `Le repository ${alertPayload.occurrence.source.url} a été fermé.`;
    }
}
export { computeAlertMessage };
