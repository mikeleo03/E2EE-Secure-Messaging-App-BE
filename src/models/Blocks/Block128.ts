import { Block } from "./Block";

export class Block128 extends Block {
    /**
     * Creates a new 128-bit block with the given data. Privated to enforce the usage of fromHex and fromUnicode methods
     * @param {Uint32Array} data
     * @constructor
     */
    private constructor(data: Uint32Array) {
        if (data.length !== 4) throw new Error('Invalid data length');
        super(data);
    }

    /**
     * Creates a new 128-bit block with the given hexadecimal
     * @param {string} hex
     * @returns {Block128}
     */
    public static fromHex(hex: string): Block128 {
        return new Block128(Block.hexToUint32Array(hex));
    }

    /**
     * Creates a new 128-bit block with the given text in unicode
     * @param {string} text
     * @returns {Block128}
     */
    public static fromUnicode(text: string): Block128 {
        return Block128.fromHex(Block.unicodeToHex(text));
    }
    
    /**
     * Perform XOR operation with other block
     * @param {Block128} block
     * @returns {Block128}
     */
    public xor(block: Block128): Block128 {
        const data = new Uint32Array(this.getData().length);

        for (let i = 0; i < data.length; i++) {
            data[i] = this.getData()[i] ^ block.getData()[i];
        }

        return new Block128(data);
    }
}