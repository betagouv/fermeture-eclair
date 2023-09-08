type alertPayloadType = {
    incident: {
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
