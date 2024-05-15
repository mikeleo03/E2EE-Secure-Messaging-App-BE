import { Block } from "../models/Blocks/Block";
import { Block128 } from "../models/Blocks/Block128";
import { Block64 } from "../models/Blocks/Block64";
import { feistelDecryptRound, feistelEncryptRound } from "./feistel";
import { fisherYatesShuffler } from "./fisher-yates";
import { generateRoundKeys } from "./key-scheduling";
import { inversePermutationString, permutationString } from "./permutation";
import { roundFunction } from "./round-function";
import { inverseShiftBlock, shiftBlock } from "./shift";
import { inverseSubstitute, substitute } from "./substitution";


// CBC CryptoNight encryption/decryption algorithm
export class CryptoNight {
    /**
     * Preprocesses the key to be 32 bytes long. If the key is longer than 32 bytes, it is truncated. If the key is shorter than 32 bytes, it is repeated until it is 32 bytes long.
     * @param {string} key
     * @returns {string}
     */
    public static preprocessKey(key: string): string {
        if (key.length > 32) return key.slice(0, 32);

        let i = 0;
        while (key.length < 32) {
            key += key[i];
            i = (i + 1) % key.length;
        }
        
        return key;
    }

    /**
     * Encrypts a block using the CryptoNight algorithm with CBC mode
     * @param {string} plaintext
     * @param {string} key
     * @returns {string}
     */
    public static async encryptToHex(plaintext: string, key: string): Promise<string> {
        const blocks: Block128[] = Block128.fromUnicodeLong(plaintext);
        const keyBlocks: Block128[] = Block128.fromUnicodeLong(key);
        const keyBlock: Block128 = Block128.fromHex(CryptoNight.preprocessKey(keyBlocks[0].getHexData()));
        
        // Temporary use key as IV
        const iv: Block128 = keyBlock.copy();

        let result: Block128[] = [];
        let previousBlock: Block128 = iv.copy();

        for (let i = 0; i < blocks.length; i++) {
            let encryptedBlock: Block128 = blocks[i].copy();
            encryptedBlock = encryptedBlock.xor(previousBlock);
            encryptedBlock = encryptedBlock.xor(keyBlock);
            encryptedBlock = await CryptoNight.encryptBlock(encryptedBlock, keyBlock, 16);
            previousBlock = encryptedBlock.copy();
            
            result.push(encryptedBlock);
        }

        return Block128.toHexLong(result);
    }

    /**
     * Decrypts a block using the CryptoNight algorithm with CBC mode
     * @param {string} ciphertext
     * @param {string} key
     * @returns {string}
     */
    public static async decryptFromHex(ciphertext: string, key: string): Promise<string> {
        const blocks: Block128[] = Block128.fromHexLong(ciphertext);
        const keyBlocks: Block128[] = Block128.fromUnicodeLong(key);
        const keyBlock: Block128 = Block128.fromHex(CryptoNight.preprocessKey(keyBlocks[0].getHexData()));
        
        // Temporary use key as IV
        const iv: Block128 = keyBlock.copy();

        let result: Block128[] = []
        let previousBlock: Block128 = iv.copy();

        for (let i = 0; i < blocks.length; i++) {
            let decryptBlock: Block128 = blocks[i].copy();
            decryptBlock = await CryptoNight.decryptBlock(decryptBlock, keyBlock, 16);
            decryptBlock = decryptBlock.xor(keyBlock);
            decryptBlock = decryptBlock.xor(previousBlock);
            previousBlock = blocks[i].copy();
            
            result.push(decryptBlock);
        }

        return Block128.toUnicodeLong(result);
    }

    /**
     * Encrypts a block using the CryptoNight algorithm
     * @param {Block128} data
     * @param {Block128} key
     * @param {number} rounds
     * @returns {Block128}
     */
    private static async encryptBlock(data: Block128, key: Block128, rounds: number): Promise<Block128> {
        let result: Block128 = data.copy();
        const roundKeys: Block128[] = generateRoundKeys(key, rounds);

        for (let i = 0; i < rounds; i++) {
            result = permutationString(result);
            result = feistelEncryptRound(result, roundKeys[i]);
            result = substitute(result);
            result = shiftBlock(result, (i + 1) % 16);
        }

        return result;
    }

    /**
     * Decrypts a block using the CryptoNight algorithm
     * @param {Block128} data
     * @param {Block128} key
     * @param {number} rounds
     * @returns {Block128}
     */
    private static async decryptBlock(data: Block128, key: Block128, rounds: number): Promise<Block128> {
        let result: Block128 = data.copy();
        const roundKeys: Block128[] = generateRoundKeys(key, rounds);

        for (let i = rounds - 1; i >= 0; i--) {
            result = inverseShiftBlock(result, (i + 1) % 16);
            result = inverseSubstitute(result);
            result = feistelDecryptRound(result, roundKeys[i]);
            result = inversePermutationString(result);
        }

        return result;
    }
}
