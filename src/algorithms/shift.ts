import { Block128 } from "../models/Blocks/Block128";


/**
 * Shifts a block to the left
 * @param {Block128} block
 * @param {number} shift
 * @returns {Block128}
 */
export function shiftBlock(block: Block128, shift: number): Block128 {
    const size = block.getData().length;
    const data: Uint8Array = new Uint8Array(size);

    for (let i = 0; i < size; i++) {
        data[i] = block.getData()[(i + shift) % size];
    }

    return new Block128(data);
}

/**
 * Shifts a block to the right
 * @param {Block128} block
 * @param {number} shift
 * @returns {Block128}
 */
export function inverseShiftBlock(block: Block128, shift: number): Block128 {
    const size = block.getData().length;
    return shiftBlock(block, size - shift);
}
