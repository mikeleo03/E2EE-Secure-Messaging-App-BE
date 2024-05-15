import { Block } from "./Block";
import { Block64 } from "./Block64";

export class Block128 extends Block {
    /**
     * Creates a new 128-bit block with the given data
     * @param {Uint8Array} data
     * @constructor
     */
    constructor(data: Uint8Array) {
        if (data.length !== 16) throw new Error('Invalid data length');
        super(data);
    }

    /**
     * Creates a new 128-bit block with the given hexadecimal
     * @param {string} hex
     * @returns {Block128}
     */
    public static fromHex(hex: string): Block128 {
        if (hex.length !== 32) throw new Error('Invalid hexadecimal length');
        return new Block128(Block.hexToUint8Array(hex));
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
     * Creates a new 128-bit block with the given halves
     * @param {Block64} left
     * @param {Block64} right
     * @returns {Block128}
     */
    public static fromHalves(left: Block64, right: Block64): Block128 {
        return new Block128(new Uint8Array([...left.getData(), ...right.getData()]));
    }

    /**
     * Returns the left half of the block
     * @returns {Block64}
     */
    public getLeftHalf(): Block64 {
        return new Block64(this.getData().slice(0, 8));
    }

    /**
     * Returns the right half of the block
     * @returns {Block64}
     */
    public getRightHalf(): Block64 {
        return new Block64(this.getData().slice(8, 16));
    }

    /**
     * Create a copy of the block
     * @returns {Block128}
     */
    public copy(): Block128 {
        const data: Uint8Array = new Uint8Array(this.getData().length);

        for (let i = 0; i < data.length; i++) {
            data[i] = this.getData()[i];
        }

        return new Block128(data);
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