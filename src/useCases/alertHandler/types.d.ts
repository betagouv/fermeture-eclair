type alertPayloadType = {
    incident: {
        detector: {
            name: string;
        };
    };
    occurrence: {
        source: {
            url: string;
        };
    };
};

export type { alertPayloadType };
