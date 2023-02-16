import { createHmac } from 'crypto';
import { config } from '../../config';

export { buildVerifySignature, verifySignature };

function buildVerifySignature(signatureToken: string) {
    return verifySignature;

    function verifySignature(headers: Record<string, string>, body: string): boolean {
        const payload_signature = headers['gitguardian-signature'];
        const timestamp = headers['timestamp'];
        const payload = body;
        const signatureHeader = payload_signature.substring(0, 7);
        if (signatureHeader !== 'sha256=') {
            return false;
        }
        var signatureActual = payload_signature.split('=')[1];

        var hmac = createHmac('sha256', Buffer.from(timestamp + signatureToken, 'utf8'));
        hmac.update(payload);
        var result = hmac.digest('hex');
        console.log(result === signatureActual ? 'The signature is OK' : 'The signature is wrong');
        return result === signatureActual;
    }
}

const verifySignature = buildVerifySignature(config.GIT_GUARDIAN_WEBHOOK_SIGNATURE);
