import { describe, it, expect } from '@jest/globals';
import { isAlertRelevant } from './isAlertRelevant.useCase';

describe('isAlertRelevant', () => {
    it('returns false for generic password', () => {
        const payload = {
            occurrence: {
                author_info: 'test@test.fr',
                source: { url: 'https://github.com/tchapgouv/tchap-android/commit/d4ebefbab' },
            },
            incident: { detector: { name: 'generic_password' } },
        };

        expect(isAlertRelevant(payload)).toBe(false);
    });
});
