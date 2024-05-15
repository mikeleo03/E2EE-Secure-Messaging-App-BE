import { Block128 } from "../models/Blocks/Block128";
import { Block64 } from "../models/Blocks/Block64";
import * as seedrandom from "seedrandom";


/**
 * Gets the bit at the given index from Block64
 * @param {Block64} data
 * @param {number} i
 * @returns {number}
 */
function getBit(data: Block64, i: number): number {
    const temp = data.getData()[Math.floor(i / 8)];
    return (temp >> (8 - (i % 8) - 1)) & 1;
}

/**
 * Swaps the bits at the given indices in Block64
 * @param {Block64} data
 * @param {number} i
 * @param {number} j
 */
function swapBit(data: Block64, i: number, j: number): void {
    const bitI = getBit(data, i);
    const bitJ = getBit(data, j);
    
    if (bitI !== bitJ) {
      data.getData()[Math.floor(i / 8)] ^= 1 << (8 - (i % 8) - 1);
      data.getData()[Math.floor(j / 8)] ^= 1 << (8 - (j % 8) - 1);
    }
  
    return;
}

/**
 * Shuffles the bits of a Block64 using the Fisher-Yates algorithm
 * @param {Block64} data
 * @param {Block128} seed
 * @param {boolean} invert
 * @returns {Block64}
 */
export function fisherYatesShuffler(
    data: Block64,
    seed: Block128,
    invert: boolean
): Block64 {
    const rng: seedrandom.PRNG = seedrandom(seed.getHexData());
    const size: number = data.getData().length;
    const result: Block64 = data.copy();

    const randomList: number[] = [];    
    randomList.push(0);
    for (let i = 8 * size - 1; i >= 1; i--) {
        randomList.push(Math.floor(rng() * (i + 1)));
    }

    if (invert) {
        for (let i = 1; i < 8 * size; i++) {
            swapBit(result, i, randomList[i]);
        }
    } else {
        for (let i = 8 * size - 1; i >= 1; i--) {
            swapBit(result, i, randomList[i]);
        }
    }

    return result;
}
