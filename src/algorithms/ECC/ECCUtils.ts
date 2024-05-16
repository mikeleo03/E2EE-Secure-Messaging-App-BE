import { EllipticCurve, ECPoint } from './EllipticCurve';
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
 * @param {EllipticCurve} curve - The elliptic curve parameters.
 * @returns {object} An object containing the ciphertext and ephemeral public key.
 */
export function encryptMessage(message: string, publicKey: ECPoint, curve: EllipticCurve): { ciphertext: Buffer, ephemeralPublicKey: ECPoint } {
    const ephemeralKeyPair = generateKeyPair(curve);
    const sharedSecret = computeSharedSecret(ephemeralKeyPair.privateKey, publicKey, curve);
    const encryptionKey = deriveKeysBuffer(sharedSecret);

    const ciphertext = simpleEncrypt(message, encryptionKey);

    return {
        ciphertext: ciphertext,
        ephemeralPublicKey: ephemeralKeyPair.publicKey
    };
}

/**
 * Decrypts a message encrypted with ECC.
 * @param {Buffer} ciphertext - The ciphertext to decrypt.
 * @param {ECPoint} ephemeralPublicKey - The ephemeral public key used for encryption.
 * @param {bigint} privateKey - The recipient's private key.
 * @param {EllipticCurve} curve - The elliptic curve parameters.
 * @returns {string} The decrypted plaintext message.
 */
export function decryptMessage(ciphertext: Buffer, ephemeralPublicKey: ECPoint, privateKey: bigint, curve: EllipticCurve): string {
    const sharedSecret = computeSharedSecret(privateKey, ephemeralPublicKey, curve);
    const encryptionKey = deriveKeysBuffer(sharedSecret);

    return simpleDecrypt(ciphertext, encryptionKey);
}