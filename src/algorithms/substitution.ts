import { Block128 } from "../models/Blocks/Block128";
import { INVERSE_S_BOX, S_BOX } from "./constants";


/**
 * Substitutes or inversely substitutes a block using the S-Box or Inverse S-Box
 * @param {Block128} block
 * @param {boolean} invert
 * @returns {Block128}
 */
function privateSubstitute(block: Block128, invert: boolean): Block128 {
    const hex: string = block.getHexData();
    const hexArr: string[] = [];

    for (let i = 0; i < hex.length; i += 2) {
        hexArr.push(hex.substring(i, i + 2));
    }

    const hexResult: string = hexArr.map((hex: string) => {
        const row: number = parseInt(hex[0], 16);
        const col: number = parseInt(hex[1], 16);

        return (invert ? INVERSE_S_BOX : S_BOX)[row][col].toString(16).padStart(2, "0");
    }).join("");

    return Block128.fromHex(hexResult);
}

/**
 * Substitutes a block using the S-Box
 * @param {Block128} block
 * @returns {Block128}
 */
export function substitute(block: Block128): Block128 {
    return privateSubstitute(block, false);
}

/**
 * Inversely substitutes a block using the Inverse S-Box
 * @param {Block128} block
 * @returns {Block128}
 */
export function inverseSubstitute(block: Block128): Block128 {
    return privateSubstitute(block, true);
}
