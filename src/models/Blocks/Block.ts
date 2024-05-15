export abstract class Block {
    // private _data: Uint8Array;
    private _data: Uint8Array;

    /**
     * Creates a new block with the given data
     * @param {Uint8Array} data
     * @constructor
     */
    constructor(data: Uint8Array) {
        this._data = data;
    }

    /**
     * Returns the data of the block
     * @returns {Uint8Array}
     */
    public getData(): Uint8Array {
        return this._data;
    }

    /**
     * Returns the data of the block in hexadecimal
     * @returns {string}
     */
    public getHexData(): string {
        return Block.uint8ArrayToHex(this._data);
    }

    /**
     * Returns the data of the block in unicode. Don't use this method if the data doesn't guarantee to be a valid unicode
     * @returns {string}
     * @throws {Error} If the data is not a valid unicode
     */
    public getTextData(): string {
        return Block.hexToUnicode(this.getHexData());
    }

    /**
     * Converts the given text in unicode to hexadecimal. Add padding to the code points to make them 6 characters long
     * @param {string} text
     * @returns {string}
     */
    protected static unicodeToHex(text: string): string {
        let hex = '';

        for (let i = 0; i < text.length; i++) {
            const codePoint: number = text.codePointAt(i);

            // Skip the next character if the code point is greater than 0xFFFF
            // For high and low surrogates handling
            if (codePoint > 0xFFFF) i++;

            hex += codePoint.toString(16).padStart(6, '0');
        }

        return hex;
    }

    /**
     * Converts the given hexadecimal to Uint8Array
     * @param {string} hex
     * @returns {Uint8Array}
     */
    protected static hexToUint8Array(hex: string): Uint8Array {
        if (hex.length % 2 !== 0) throw new Error('Invalid hexadecimal length');

        const data = new Uint8Array(hex.length / 2);

        for (let i = 0; i < data.length; i++) {
            data[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
        }

        return data;
    }
    
    /**
     * Converts the given Uint8Array to hexadecimal. Remove padding from the hexadecimal end
     * @param {Uint8Array} data
     * @returns {string}
     */
    protected static uint8ArrayToHex(data: Uint8Array): string {
        let hex = '';

        for (let i = 0; i < data.length; i++) {
            hex += data[i].toString(16).padStart(2, '0');
        }

        return hex;
    }

    /**
     * Converts the given hexadecimal to text in unicode
     * @param {string} hex
     * @returns {string}
     */
    protected static hexToUnicode(hex: string): string {
        let text = '';

        for (let i = 0; i < hex.length; i += 6) {
            const codePoint: number = parseInt(hex.substring(i, i + 6), 16);
            text += String.fromCodePoint(codePoint);
        }

        return text;
    }

    /**
     * Add padding to the hexadecimal to make it multiple of the expected multiple. The padding size is added as the 2 last hexadecimal characters.
     * @param {string} hex
     * @param {number} expectedMultiple
     * @returns {string}
     */
    protected static padHex(hex: string, expectedMultiple: number): string {
        const padSize = (expectedMultiple - (hex.length + 2) % expectedMultiple) % expectedMultiple;
        hex = hex.padEnd(hex.length + padSize, '0');
        hex += padSize.toString(16).padStart(2, '0');
        return hex;
    }

    /**
     * Remove padding from the hexadecimal. The padding size is the 2 last hexadecimal characters.
     * @param {string} hex
     * @returns {string}
     */
    protected static unpadHex(hex: string): string {
        const padSize = parseInt(hex.substring(hex.length - 2), 16);
        return hex.substring(0, hex.length - 2 - padSize);
    }

    /**
     * Create a copy of the block
     * @returns {Block}
     */
    public abstract copy(): Block;

    /**
     * Perform XOR operation with other block
     * @param {Block} block
     * @returns {Block}
     */
    public abstract xor(block: Block): Block;
}
