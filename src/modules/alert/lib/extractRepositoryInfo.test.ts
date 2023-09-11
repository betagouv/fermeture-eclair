import { describe, it, expect } from '@jest/globals';
import { extractRepositoryInfo } from './extractRepositoryInfo';
import { alertPayloadSample } from './alertPayload.sample';

describe('extractRepositoryInfo', () => {
    it('extracts the right repository info', () => {
        const payload = alertPayloadSample;

        const repositoryInfo = extractRepositoryInfo(payload);
        expect(repositoryInfo).toEqual({ name: 'chronodose-finder', owner: 'BenoitSerrano' });
    });
});
