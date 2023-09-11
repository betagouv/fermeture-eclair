type alertPayloadType = {
    action:
        | 'new_occurrence'
        | 'incident_triggered'
        | 'incident_assigned'
        | 'incident_reassigned'
        | 'incident_severity_changed'
        | 'incident_validity_changed'
        | 'incident_resolved'
        | 'incident_resolved'
        | 'incident_reopened'
        | 'incident_regression'
        | 'incident_access_granted'
        | 'incident_access_revoked'
        | 'incident_shared_publicly'
        | 'incident_unshared_publicly'
        | 'incident_note_created';
    incident: {
        id: number;
        detector: {
            name: string;
        };
        gitguardian_url: string;
    };
    occurrence: {
        url: string;
        author_info: string;
        source: {
            full_name: string;
            url: string;
        };
    };
};

export type { alertPayloadType };
