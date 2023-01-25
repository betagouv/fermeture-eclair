import { describe, it, expect } from '@jest/globals';
import { RSA } from './rsa';

describe('rsa', () => {
    it('retrieves the initial message after encrypting and decrypting', () => {
        const { privateKey, publicKey } = RSA.generateKeyPair();
        const rsa = new RSA({ privateKey, publicKey });
        const initialMessage = 'Hello there!';
        const encryptedMessage = rsa.encrypt(initialMessage);
        const decryptedMessage = rsa.decrypt(encryptedMessage);
        expect(decryptedMessage).toBe(initialMessage);
    });
});
