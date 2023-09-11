import { describe, it, expect } from '@jest/globals';
import { isAlertRelevant } from './isAlertRelevant';
import { alertPayloadSample } from './alertPayload.sample';

describe('isAlertRelevant', () => {
    it('returns false for generic password', () => {
        const payload = alertPayloadSample;

        expect(isAlertRelevant(payload)).toBe(false);
    });
});
