/**
 * Converts the given text in unicode to hexadecimal. Add padding to the code points to make them 6 characters long
 * @param {string} text
 * @returns {string}
*/
export function unicodeToHex(text: string): string {
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
 * Converts the given hexadecimal to text in unicode
 * @param {string} hex
 * @returns {string}
 */
export function hexToUnicode(hex: string): string {
    let text = '';

    for (let i = 0; i < hex.length; i += 6) {
        const codePoint: number = parseInt(hex.substring(i, i + 6), 16);
        text += String.fromCodePoint(codePoint);
    }

    return text;
}