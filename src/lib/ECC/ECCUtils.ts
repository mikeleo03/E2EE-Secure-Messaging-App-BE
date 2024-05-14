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

function deriveKeys(sharedSecret: ECPoint): { encryptionKey: Buffer, macKey: Buffer } {
    const sharedSecretHex = sharedSecret.x.toString(16).padStart(64, '0') + sharedSecret.y.toString(16).padStart(64, '0');
    const hash = simpleHash(sharedSecretHex);

    return {
        encryptionKey: hash.slice(0, 16),  // 128-bit encryption key
        macKey: hash.slice(16, 32)         // 128-bit MAC key
    };
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

function simpleHMAC(data: Buffer, key: Buffer): Buffer {
    // A very basic HMAC
    const keyBuffer = Buffer.alloc(64, 0);
    key.copy(keyBuffer);

    const o_key_pad = Buffer.alloc(64, 0x5c);
    const i_key_pad = Buffer.alloc(64, 0x36);

    for (let i = 0; i < 64; i++) {
        o_key_pad[i] ^= keyBuffer[i];
        i_key_pad[i] ^= keyBuffer[i];
    }

    const innerHash = simpleHash(i_key_pad.toString('hex') + data.toString('hex'));
    return simpleHash(o_key_pad.toString('hex') + innerHash.toString('hex'));
}

export function encryptMessage(message: string, publicKey: ECPoint, curve: EllipticCurve): { ciphertext: Buffer, ephemeralPublicKey: ECPoint, mac: Buffer } {
    const ephemeralKeyPair = generateKeyPair(curve);
    const sharedSecret = computeSharedSecret(ephemeralKeyPair.privateKey, publicKey, curve);
    const { encryptionKey, macKey } = deriveKeys(sharedSecret);

    const ciphertext = simpleEncrypt(message, encryptionKey);
    const mac = simpleHMAC(ciphertext, macKey);

    return {
        ciphertext: ciphertext,
        ephemeralPublicKey: ephemeralKeyPair.publicKey,
        mac: mac
    };
}

export function decryptMessage(ciphertext: Buffer, ephemeralPublicKey: ECPoint, privateKey: bigint, mac: Buffer, curve: EllipticCurve): string {
    const sharedSecret = computeSharedSecret(privateKey, ephemeralPublicKey, curve);
    const { encryptionKey, macKey } = deriveKeys(sharedSecret);

    const calculatedMac = simpleHMAC(ciphertext, macKey);
    if (!calculatedMac.equals(mac)) {
        throw new Error('Invalid MAC');
    }

    return simpleDecrypt(ciphertext, encryptionKey);
}