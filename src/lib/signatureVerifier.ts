import { createHmac } from 'crypto';

export { signatureVerifier };

const signatureVerifier = {
    check,
};

function check(signature: string, timestamp: string, signatureToken: string, payload: string) {
    const signatureHeader = signature.substring(0, 7);
    if (signatureHeader !== 'sha256=') {
        return false;
    }
    var signatureActual = signature.split('=')[1];

    var hmac = createHmac('sha256', Buffer.from(timestamp + signatureToken, 'utf8'));
    hmac.update(payload);
    var result = hmac.digest('hex');
    if (result === signatureActual) {
        return true;
    } else {
        return false;
    }
}
