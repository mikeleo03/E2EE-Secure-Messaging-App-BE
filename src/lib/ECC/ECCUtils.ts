import { EllipticCurve, ECPoint } from './EllipticCurve';
import { generateKeyPair, computeSharedSecret } from '../ECDH/ECDHUtils';

function simpleHash(data: string): Buffer {
    // A very basic hash function
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        hash = (hash << 5) - hash + data.charCodeAt(i);
        hash |= 0;
    }
    return Buffer.from(hash.toString(16).padStart(8, '0'), 'hex');
}

function deriveKeys(sharedSecret: ECPoint): Buffer {
    const sharedSecretHex = sharedSecret.x.toString(16).padStart(64, '0') + sharedSecret.y.toString(16).padStart(64, '0');
    const hash = simpleHash(sharedSecretHex);

    return hash.slice(0, 16);  // 128-bit encryption key
}

function simpleEncrypt(plaintext: string, key: Buffer): Buffer {
    // A simple XOR encryption
    const textBuffer = Buffer.from(plaintext, 'utf8');
    const encrypted = Buffer.alloc(textBuffer.length);

    for (let i = 0; i < textBuffer.length; i++) {
        encrypted[i] = textBuffer[i] ^ key[i % key.length];
    }

    return encrypted;
}

function simpleDecrypt(ciphertext: Buffer, key: Buffer): string {
    // A simple XOR decryption
    const decrypted = Buffer.alloc(ciphertext.length);

    for (let i = 0; i < ciphertext.length; i++) {
        decrypted[i] = ciphertext[i] ^ key[i % key.length];
    }

    return decrypted.toString('utf8');
}

export function encryptMessage(message: string, publicKey: ECPoint, curve: EllipticCurve): { ciphertext: Buffer, ephemeralPublicKey: ECPoint } {
    const ephemeralKeyPair = generateKeyPair(curve);
    const sharedSecret = computeSharedSecret(ephemeralKeyPair.privateKey, publicKey, curve);
    const encryptionKey = deriveKeys(sharedSecret);

    const ciphertext = simpleEncrypt(message, encryptionKey);

    return {
        ciphertext: ciphertext,
        ephemeralPublicKey: ephemeralKeyPair.publicKey
    };
}

export function decryptMessage(ciphertext: Buffer, ephemeralPublicKey: ECPoint, privateKey: bigint, curve: EllipticCurve): string {
    const sharedSecret = computeSharedSecret(privateKey, ephemeralPublicKey, curve);
    const encryptionKey = deriveKeys(sharedSecret);

    return simpleDecrypt(ciphertext, encryptionKey);
}