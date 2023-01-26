export { extractRepositoryInfo };

export type { alertPayloadType };

type alertPayloadType = {
    occurrence: {
        source: {
            url: string;
        };
    };
};

function extractRepositoryInfo(payload: alertPayloadType) {
    console.log('PAYLOAD');
    console.log(payload);
    const url = new URL(payload.occurrence.source.url);
    const [_, owner, name] = url.pathname.split('/');

    return {
        name,
        owner,
    };
}
