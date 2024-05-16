import { EllipticCurve, ECPoint } from './EllipticCurve';
import { generateKeyPair, computeSharedSecret } from '../ECDH/ECDHUtils';

/**
 * A very basic hash function.
 * @param {string} data - The input data.
 * @returns {Buffer} The hash of the input data.
 */
function simpleHash(data: string): Buffer {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        hash = (hash << 5) - hash + data.charCodeAt(i);
        hash |= 0;
    }
    return Buffer.from(hash.toString(16).padStart(8, '0'), 'hex');
}

/**
 * Derives encryption key from the shared secret.
 * @param {ECPoint} sharedSecret - The shared secret.
 * @returns {Buffer} A buffer containing the encryption key.
 */
function deriveKeys(sharedSecret: ECPoint): Buffer {
    const sharedSecretHex = sharedSecret.x.toString(16).padStart(64, '0') + sharedSecret.y.toString(16).padStart(64, '0');
    const hash = simpleHash(sharedSecretHex);

    return hash.slice(0, 16);  // 128-bit encryption key
}

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
 * @param {ECPoint} targetpublicKey - The recipient's public key.
 * @param {bigint} senderprivatekey - The sender's private key.
 * @returns {Buffer} A buffer containing the ciphertext.
 */
export function encryptMessage(message: string, targetpublicKey: ECPoint, senderprivatekey: bigint): Buffer {
    const curve = new EllipticCurve();
    const sharedSecret = computeSharedSecret(senderprivatekey, targetpublicKey, curve);
    const encryptionKey = deriveKeys(sharedSecret);

    const ciphertext = simpleEncrypt(message, encryptionKey);

    return ciphertext;
}

/**
 * Decrypts a message encrypted with ECC.
 * @param {Buffer} ciphertext - The ciphertext to decrypt.
 * @param {ECPoint} senderpublicKey - The sender's public key used for encryption.
 * @param {bigint} targetprivateKey - The recipient's private key.
 * @returns {string} The decrypted plaintext message.
 */
export function decryptMessage(ciphertext: Buffer, senderpublicKey: ECPoint, targetprivateKey: bigint): string {
    const curve = new EllipticCurve();
    const sharedSecret = computeSharedSecret(targetprivateKey, senderpublicKey, curve);
    const encryptionKey = deriveKeys(sharedSecret);

    return simpleDecrypt(ciphertext, encryptionKey);
}