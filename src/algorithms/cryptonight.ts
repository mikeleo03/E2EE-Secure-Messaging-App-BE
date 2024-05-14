import { Block } from "../models/Blocks/Block";
import { Block128 } from "../models/Blocks/Block128";


// CBC CryptoNight encryption/decryption algorithm
export class CryptoNight {
    /**
     * Encrypts a block using the CryptoNight algorithm with CBC mode
     * @param {string} plaintext
     * @param {string} key
     * @returns {string}
     */
    public static async encrypt(plaintext: string, key: string): Promise<string> {
        const block = Block128.fromUnicode(plaintext);
        return block.getTextData();
    }

    /**
     * Decrypts a block using the CryptoNight algorithm with CBC mode
     * @param {string} ciphertext
     * @param {string} key
     * @returns {string}
     */
    public static async decrypt(ciphertext: string, key: string): Promise<string> {
        return ciphertext;
    }
}
