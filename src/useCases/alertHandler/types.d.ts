type alertPayloadType = {
    incident: {
        detector: {
            name: string;
        };
        gitguardian_url: string;
    };
    occurrence: {
        author_info: string;
        source: {
            url: string;
        };
    };
};

export type { alertPayloadType };
