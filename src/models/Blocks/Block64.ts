import { Block } from "./Block";

export class Block64 extends Block {
    /**
     * Creates a new 64-bit block with the given data
     * @param {Uint8Array} data
     * @constructor
     */
    constructor(data: Uint8Array) {
        if (data.length !== 8) throw new Error('Invalid data length');
        super(data);
    }

    /**
     * Creates a new 64-bit block with the given hexadecimal
     * @param {string} hex
     * @returns {Block64}
     */
    public static fromHex(hex: string): Block64 {
        if (hex.length !== 16) throw new Error('Invalid hexadecimal length');
        return new Block64(Block.hexToUint8Array(hex));
    }

    /**
     * Creates a new 64-bit blocks with the given hexadecimal
     * @param {string} hex
     * @returns {Block64[]}
     */
    public static fromHexLong(hex: string): Block64[] {
        if (hex.length % 16 !== 0) throw new Error('Invalid hexadecimal length');

        const blocks: Block64[] = [];

        for (let i = 0; i < hex.length; i += 16) {
            blocks.push(new Block64(Block.hexToUint8Array(hex.substring(i, i + 16))));
        }

        return blocks;
    }

    /**
     * Converts the given 64-bit blocks to hexadecimal
     * @param {Block64[]} blocks
     * @returns {string}
     */
    public static toHexLong(blocks: Block64[]): string {
        let hex = '';

        for (let i = 0; i < blocks.length; i++) {
            hex += blocks[i].getHexData();
        }

        return hex;
    }

    /**
     * Creates a new 64-bit blocks with the given text in unicode
     * @param {string} text
     * @returns {Block64[]}
     */
    public static fromUnicodeLong(text: string): Block64[] {
        let hex = Block.unicodeToHex(text);
        hex = this.padHex(hex, 16);
        return Block64.fromHexLong(hex);
    }

    /**
     * Converts the given 64-bit blocks to text in unicode
     * @param {Block64[]} blocks
     * @returns {string}
     */
    public static toUnicodeLong(blocks: Block64[]): string {
        let hex = Block64.toHexLong(blocks);
        
        // Remove padding from the hexadecimal end
        hex = Block.unpadHex(hex);

        return Block.hexToUnicode(hex);
    }

    /**
     * Create a copy of the block
     * @returns {Block64}
     */
    public copy(): Block64 {
        const data: Uint8Array = new Uint8Array(this.getData().length);

        for (let i = 0; i < data.length; i++) {
            data[i] = this.getData()[i];
        }

        return new Block64(data);
    }
    
    /**
     * Perform XOR operation with other block
     * @param {Block64} block
     * @returns {Block64}
     */
    public xor(block: Block64): Block64 {
        const data = new Uint8Array(this.getData().length);

        for (let i = 0; i < data.length; i++) {
            data[i] = this.getData()[i] ^ block.getData()[i];
        }

        return new Block64(data);
    }
}