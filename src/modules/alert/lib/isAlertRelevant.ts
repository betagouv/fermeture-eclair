import { alertPayloadType } from './types';

const IGNORED_DETECTOR_NAMES = ['generic_password'];

function isAlertRelevant(alertPayload: alertPayloadType): boolean {
    if (alertPayload.action !== 'new_occurrence') {
        return false;
    }
    try {
        const isDetectorIgnored = IGNORED_DETECTOR_NAMES.includes(
            alertPayload.incident.detector.name,
        );
        return !isDetectorIgnored;
    } catch (error) {
        console.warn(error);
        console.log(alertPayload);
        return false;
    }
}

export { isAlertRelevant };
