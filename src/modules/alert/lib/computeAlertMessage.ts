import { alertPayloadType } from './types';

type eventKindType = 'alert-received' | 'repository-closed';

function computeAlertMessage(eventKind: eventKindType, alertPayload: alertPayloadType) {
    switch (eventKind) {
        case 'alert-received':
            const prefix = `Alerte (${alertPayload.action})`;
            switch (alertPayload.action) {
                case 'new_occurrence':
                    return `${prefix} sur le dépôt ${alertPayload.occurrence.source.url} : `;
                default:
                    return prefix;
            }
        case 'repository-closed':
            return `Le repository ${alertPayload.occurrence.source.url} a été fermé.`;
    }
}
export { computeAlertMessage };
