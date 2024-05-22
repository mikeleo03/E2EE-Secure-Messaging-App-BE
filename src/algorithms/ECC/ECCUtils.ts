import { ECPoint } from './EllipticCurve';
import { deriveKeysBuffer, generateKeyPair, computeSharedSecret } from '../ECDH/ECDHUtils';

/**
 * A simple XOR encryption function.
 * @param {string} plaintext - The plaintext to encrypt.
 * @param {Buffer} key - The encryption key.
 * @returns {Buffer} The encrypted ciphertext.
 */
function simpleEncrypt(plaintext: string, key: Buffer): Buffer {
    const textBuffer = Buffer.from(plaintext, 'utf8');
    const encrypted = Buffer.alloc(textBuffer.length);

    for (let i = 0; i < textBuffer.length; i++) {
        encrypted[i] = textBuffer[i] ^ key[i % key.length];
    }

    return encrypted;
}

/**
 * A simple XOR decryption function.
 * @param {Buffer} ciphertext - The ciphertext to decrypt.
 * @param {Buffer} key - The decryption key.
 * @returns {string} The decrypted plaintext.
 */
function simpleDecrypt(ciphertext: Buffer, key: Buffer): string {
    // A simple XOR decryption
    const decrypted = Buffer.alloc(ciphertext.length);

    for (let i = 0; i < ciphertext.length; i++) {
        decrypted[i] = ciphertext[i] ^ key[i % key.length];
    }

    return decrypted.toString('utf8');
}

/**
 * Encrypts a message using ECC.
 * @param {string} message - The message to encrypt.
 * @param {ECPoint} publicKey - The recipient's public key.
 * @returns {Buffer} The encrypted ciphertext.
 */
export function encryptMessage(message: string, publicKey: ECPoint): Buffer {
    const key = deriveKeysBuffer(publicKey);
    const ciphertext = simpleEncrypt(message, key);

    return ciphertext;
}

/**
 * Decrypts a message encrypted with ECC.
 * @param {Buffer} ciphertext - The ciphertext to decrypt.
 * @param {bigint} privateKey - The recipient's private key.
 * @returns {string} The decrypted plaintext message.
 */
export function decryptMessage(ciphertext: Buffer, privateKey: ECPoint): string {
    const key = deriveKeysBuffer(privateKey);
    const decrypted = simpleDecrypt(ciphertext, key);

    return decrypted;
}