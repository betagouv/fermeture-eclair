import crypto from 'crypto';
import { config } from '../config';

class RSA {
    privateKey: string;
    publicKey: string;
    constructor(keys?: { publicKey: string; privateKey: string }) {
        this.privateKey =
            keys?.privateKey ||
            Buffer.from(config.GITHUB_TOKEN_ENCRYPTION_PRIVATE_KEY, 'base64').toString();
        this.publicKey =
            keys?.publicKey ||
            Buffer.from(config.GITHUB_TOKEN_ENCRYPTION_PUBLIC_KEY, 'base64').toString();
    }

    encrypt(clearMessage: string) {
        return crypto
            .publicEncrypt(
                {
                    key: this.publicKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                },
                Buffer.from(clearMessage, 'utf-8'),
            )
            .toString('hex');
    }

    decrypt(encryptedMessage: string) {
        return crypto
            .privateDecrypt(
                {
                    key: this.privateKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                },
                Buffer.from(encryptedMessage, 'hex'),
            )
            .toString('utf-8');
    }
    static generateKeyPair() {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096, // bits - standard for RSA keys
            publicKeyEncoding: {
                type: 'pkcs1', // "Public Key Cryptography Standards 1"
                format: 'pem', // Most common formatting choice
            },
            privateKeyEncoding: {
                type: 'pkcs1', // "Public Key Cryptography Standards 1"
                format: 'pem', // Most common formatting choice
            },
        });
        return { privateKey, publicKey };
    }
}
const rsa = new RSA();

export { RSA, rsa };
