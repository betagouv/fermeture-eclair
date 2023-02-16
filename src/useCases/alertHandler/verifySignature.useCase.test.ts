import { describe, it, expect } from '@jest/globals';
import { buildVerifySignature } from './verifySignature.useCase';

describe('isAlertRelevant', () => {
    const verifySignature = buildVerifySignature('foo');
    it('returns true for valid signature', () => {
        const headers = {
            timestamp: '0',
            'gitguardian-signature':
                'sha256=172fe3d694b734aa53dc892fd3b8d62163fc240064de570ba006900bb54a0fc2',
        };
        const body = 'bar';

        expect(verifySignature(headers, body)).toBe(true);
    });

    it('returns false for invalid signature', () => {
        const headers = {
            timestamp: '0',
            'gitguardian-signature':
                'sha256=172fe3d694b734aa53dc892fd3b8d62163fc240064de570ba006900bb54a0fc2',
        };
        const body = 'bars';

        expect(verifySignature(headers, body)).toBe(false);
    });
});
