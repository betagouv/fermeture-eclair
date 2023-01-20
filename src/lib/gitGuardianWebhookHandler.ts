import { createHmac } from 'crypto';

export { gitGuardianWebhookHandler };

const gitGuardianWebhookHandler = {
    verifySignature,
};

function verifySignature(
    signature: string,
    timestamp: string,
    signatureToken: string,
    payload: string,
) {
    const signatureHeader = signature.substring(0, 7);
    if (signatureHeader !== 'sha256=') {
        return false;
    }
    var signatureActual = signature.split('=')[1];

    var hmac = createHmac('sha256', Buffer.from(timestamp + signatureToken, 'utf8'));
    hmac.update(payload);
    var result = hmac.digest('hex');
    return result === signatureActual;
}
