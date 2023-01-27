import { describe, it, expect } from '@jest/globals';
import { extractRepositoryInfo } from './extractRepositoryInfo.useCase';

describe('extractRepositoryInfo', () => {
    it('extracts the right repository info', () => {
        const payload = {
            source: 'GitGuardian',
            timestamp: '2022-06-23T09:10:24.594597Z',
            action: 'new_occurrence',
            message: 'A new occurrence has been detected for this incident.',
            target_user: 'GitGuardian',
            incident: {
                id: 31605,
                date: '2022-06-16T08:23:40Z',
                detector: {
                    name: 'aws_iam',
                    display_name: 'AWS Keys',
                    nature: 'specific',
                    family: 'Api',
                    detector_group_name: 'aws_iam',
                    detector_group_display_name: 'AWS Keys',
                },
                secret_hash: 'xxx',
                secret_revoked: false,
                occurrence_count: 5,
                status: 'assigned',
                regression: false,
                assignee_email: 'bruce.wayne@gitguardian.com',
                severity: 'high',
                validity: 'not_checked',
                ignored_at: null,
                ignore_reason: null,
                resolved_at: null,
                gitguardian_url: 'https://dashboard.gitguardian.com/workspace/1/incidents/xxx',
                share_url: null,
            },
            occurrence: {
                id: 1234,
                incident_id: 1243,
                kind: 'RLTM',
                sha: 'xxx',
                author_name: 'GitHub',
                author_info: 'noreply@github.com',
                date: '2022-06-23T09:10:23.529812Z',
                presence: 'visible',
                url: 'https://github.com/user/repo/commit/123#diff-xxx',
                matches: [],
                filepath: 'TestJS.js',
                source: {
                    id: 710,
                    url: 'https://github.com/BenoitSerrano/chronodose-finder',
                    type: 'github',
                    full_name: 'name of repository',
                    health: 'at_risk',
                    open_incidents_count: 5,
                    closed_incidents_count: 0,
                    visibility: 'private',
                    last_scan: {
                        status: 'finished',
                        date: '2022-11-18T17:07:59.079520Z',
                    },
                    external_id: 'github_id',
                },
            },
        };

        const repositoryInfo = extractRepositoryInfo(payload);
        expect(repositoryInfo).toEqual({ name: 'chronodose-finder', owner: 'BenoitSerrano' });
    });
});
