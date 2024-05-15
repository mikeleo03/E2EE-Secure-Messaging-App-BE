import { Block } from "../models/Blocks/Block";
import { Block128 } from "../models/Blocks/Block128";
import { Block64 } from "../models/Blocks/Block64";
import { fisherYatesShuffler } from "./fisher-yates";
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
    public static async encrypt(plaintext: string, key: string): Promise<string> {
        const blocks: Block128[] = Block128.fromUnicodeLong(plaintext);
        const keyBlock: Block128 = Block128.fromHex(CryptoNight.preprocessKey(key));
        
        // Temporary use key as IV
        const iv: Block128 = new Block128(keyBlock.getData());

        console.log(Block128.toHexLong(blocks));
        const result: Block128[] = [];
        for (let i = 0; i < blocks.length; i++) {
            console.log("Iteration: ", i);

            let left: Block64 = blocks[i].getLeftHalf();
            let right: Block64 = blocks[i].getRightHalf();

            console.log(left.getHexData());
            console.log(right.getHexData());

            left = fisherYatesShuffler(left, keyBlock, false);
            right = fisherYatesShuffler(right, keyBlock, false);

            let processed: Block128 = Block128.fromHalves(left, right);
            result.push(processed);
        }

        // Debug output decrypted
        const decryptedBlocks: Block128[] = [];
        for (let i = 0; i < result.length; i++) {
            console.log("Decryption Iteration: ", i);

            let left: Block64 = result[i].getLeftHalf();
            let right: Block64 = result[i].getRightHalf();

            console.log(left.getHexData());
            console.log(right.getHexData());

            left = fisherYatesShuffler(left, keyBlock, true);
            right = fisherYatesShuffler(right, keyBlock, true);

            let processed: Block128 = Block128.fromHalves(left, right);
            decryptedBlocks.push(processed);
        }

        console.log("Decrypted: ", Block128.toUnicodeLong(decryptedBlocks));
        return plaintext;
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
