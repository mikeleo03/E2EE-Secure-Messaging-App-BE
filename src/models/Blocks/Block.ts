export abstract class Block {
    private _data: Uint32Array;

    /**
     * Creates a new block with the given data
     * @param {Uint32Array} data
     * @constructor
     */
    constructor(data: Uint32Array) {
        this._data = data;
    }

    /**
     * Returns the data of the block
     * @returns {Uint32Array}
     */
    public getData(): Uint32Array {
        return this._data;
    }

    /**
     * Returns the data of the block in hexadecimal
     * @returns {string}
     */
    public getHexData(): string {
        return Block.uint32ArrayToHex(this._data);
    }

    /**
     * Returns the data of the block in unicode. Don't use this method if the data doesn't guarantee to be a valid unicode
     * @returns {string}
     * @throws {Error} If the data is not a valid unicode
     */
    public getTextData(): string {
        return Block.hexToUnicode(Block.uint32ArrayToHex(this._data));
    }

    /**
     * Converts the given text in unicode to hexadecimal. Add padding to the code points to make them 6 characters long
     * @param {string} text
     * @returns {string}
     */
    protected static unicodeToHex(text: string): string {
        let hex = '';

        console.log(text);
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
     * Converts the given hexadecimal to Uint32Array. Add padding to the end of the hexadecimal to make it divisible by 8
     * @param {string} hex
     * @returns {Uint32Array}
     */
    protected static hexToUint32Array(hex: string): Uint32Array {
        // Add padding with zeroes and number of padding in the back
        const padLength = 8 - (hex.length % 8) - 1;
        for (let i = 0; i < padLength; i++) hex += '0';
        hex += padLength.toString(16);
        
        // Throw an error if the length of the hexadecimal is not divisible by 8
        if (hex.length % 8 !== 0) throw new Error('Invalid hexadecimal length');

        const data = new Uint32Array(hex.length / 8);

        for (let i = 0; i < data.length; i++) {
            data[i] = parseInt(hex.substring(i * 8, i * 8 + 8), 16);
        }

        return data;
    }
    
    /**
     * Converts the given Uint32Array to hexadecimal. Remove padding from the hexadecimal end
     * @param {Uint32Array} data
     * @returns {string}
     */
    protected static uint32ArrayToHex(data: Uint32Array): string {
        let hex = '';

        for (let i = 0; i < data.length; i++) {
            hex += data[i].toString(16);
        }

        // Remove padding with zeroes and number of padding in the back
        const padLength = parseInt(hex.charAt(hex.length - 1), 16);
        hex = hex.substring(0, hex.length - 1 - padLength);

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
     * Perform XOR operation with other block
     * @param {Block} block
     * @returns {Block}
     */
    public abstract xor(block: Block): Block;
}
