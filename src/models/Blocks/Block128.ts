import { Block } from "./Block";

export class Block128 extends Block {
    /**
     * Creates a new 128-bit block with the given data. Privated to enforce the usage of fromHex and fromUnicode methods
     * @param {Uint8Array} data
     * @constructor
     */
    private constructor(data: Uint8Array) {
        if (data.length !== 16) throw new Error('Invalid data length');
        super(data);
    }

    /**
     * Creates a new 128-bit blocks with the given hexadecimal
     * @param {string} hex
     * @returns {Block128[]}
     */
    public static fromHexLong(hex: string): Block128[] {
        if (hex.length % 32 !== 0) throw new Error('Invalid hexadecimal length');

        const blocks: Block128[] = [];

        for (let i = 0; i < hex.length; i += 32) {
            blocks.push(new Block128(Block.hexToUint8Array(hex.substring(i, i + 32))));
        }

        return blocks;
    }

    /**
     * Converts the given 128-bit blocks to hexadecimal
     * @param {Block128[]} blocks
     * @returns {string}
     */
    public static toHexLong(blocks: Block128[]): string {
        let hex = '';

        for (let i = 0; i < blocks.length; i++) {
            hex += blocks[i].getHexData();
        }

        return hex;
    }

    /**
     * Creates a new 128-bit blocks with the given text in unicode
     * @param {string} text
     * @returns {Block128[]}
     */
    public static fromUnicodeLong(text: string): Block128[] {
        let hex = Block.unicodeToHex(text);
        hex = this.padHex(hex, 32);
        return Block128.fromHexLong(hex);
    }

    /**
     * Converts the given 128-bit blocks to text in unicode
     * @param {Block128[]} blocks
     * @returns {string}
     */
    public static toUnicodeLong(blocks: Block128[]): string {
        let hex = Block128.toHexLong(blocks);

        // Remove padding from the hexadecimal end
        hex = Block.unpadHex(hex);

        return Block.hexToUnicode(hex);
    }
    
    /**
     * Perform XOR operation with other block
     * @param {Block128} block
     * @returns {Block128}
     */
    public xor(block: Block128): Block128 {
        const data = new Uint8Array(this.getData().length);

        for (let i = 0; i < data.length; i++) {
            data[i] = this.getData()[i] ^ block.getData()[i];
        }

        return new Block128(data);
    }
}