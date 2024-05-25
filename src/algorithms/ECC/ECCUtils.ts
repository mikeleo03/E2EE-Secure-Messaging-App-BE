import { ECPoint } from './EllipticCurve';
import { deriveKeysBuffer, generateKeyPair, computeSharedSecret } from '../ECDH/ECDHUtils';
import { hexToUnicode, unicodeToHex } from '../../utils/string_converter';

/**
 * A simple XOR encryption function.
 * @param {string} plaintext - The plaintext to encrypt in unicode format.
 * @param {Buffer} key - The encryption key.
 * @returns {string} The encrypted ciphertext in hexadecimal format.
 */
function simpleEncrypt(plaintext: string, key: Buffer): string {
    const hexPlaintext = unicodeToHex(plaintext);
    const hexKey = key.toString('hex');

    let encrypted = '';
    for (let i = 0; i < hexPlaintext.length; i += 2) {
        const plaintextSlice = hexPlaintext.slice(i, i + 2);
        const keySlice = hexKey.slice(i, i + 2);

        const encryptedByte = parseInt(plaintextSlice, 16) ^ parseInt(keySlice, 16);
        encrypted += encryptedByte.toString(16).padStart(2, '0');
    }

    return encrypted;
}

/**
 * A simple XOR decryption function.
 * @param {Buffer} ciphertext - The ciphertext to decrypt in hexadecimal format.
 * @param {Buffer} key - The decryption key.
 * @returns {string} The decrypted plaintext in unicode format.
 */
function simpleDecrypt(ciphertext: string, key: Buffer): string {
    // A simple XOR decryption
    const hexKey = key.toString('hex');

    let decryptedHex = '';
    for (let i = 0; i < ciphertext.length; i += 2) {
        const ciphertextSlice = ciphertext.slice(i, i + 2);
        const keySlice = hexKey.slice(i, i + 2);

        const decryptedByte = parseInt(ciphertextSlice, 16) ^ parseInt(keySlice, 16);
        decryptedHex += decryptedByte.toString(16).padStart(2, '0');
    }

    return hexToUnicode(decryptedHex);
}

/**
 * Encrypts a message using ECC.
 * @param {string} message - The message to encrypt in unicode format.
 * @param {ECPoint} publicKey - The recipient's public key.
 * @returns {Buffer} The encrypted ciphertext in hexadecimal format.
 */
export function encryptMessage(message: string, publicKey: ECPoint): string {
    const key = deriveKeysBuffer(publicKey);
    const ciphertext = simpleEncrypt(message, key);

    return ciphertext;
}

/**
 * Decrypts a message encrypted with ECC.
 * @param {Buffer} ciphertext - The ciphertext to decrypt in hexadecimal format.
 * @param {bigint} privateKey - The recipient's private key.
 * @returns {string} The decrypted plaintext message in unicode format.
 */
export function decryptMessage(ciphertext: string, privateKey: ECPoint): string {
    const key = deriveKeysBuffer(privateKey);
    const decrypted = simpleDecrypt(ciphertext, key);

    return decrypted;
}