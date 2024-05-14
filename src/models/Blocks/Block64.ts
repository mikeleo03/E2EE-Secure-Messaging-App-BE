import { Block } from "./Block";

export class Block64 extends Block {
    /**
     * Creates a new 64-bit block with the given data. Privated to enforce the usage of fromHex and fromUnicode methods
     * @param {Uint32Array} data
     * @constructor
     */
    private constructor(data: Uint32Array) {
        if (data.length !== 2) throw new Error('Invalid data length');
        super(data);
    }

    /**
     * Creates a new 64-bit block with the given hexadecimal
     * @param {string} hex
     * @returns {Block64}
     */
    public static fromHex(hex: string): Block64 {
        return new Block64(Block.hexToUint32Array(hex));
    }

    /**
     * Creates a new 64-bit block with the given text in unicode
     * @param {string} text
     * @returns {Block64}
     */
    public static fromUnicode(text: string): Block64 {
        return Block64.fromHex(Block.unicodeToHex(text));
    }
    
    /**
     * Perform XOR operation with other block
     * @param {Block64} block
     * @returns {Block64}
     */
    public xor(block: Block64): Block64 {
        const data = new Uint32Array(this.getData().length);

        for (let i = 0; i < data.length; i++) {
            data[i] = this.getData()[i] ^ block.getData()[i];
        }

        return new Block64(data);
    }
}