import { Block128 } from "../models/Blocks/Block128";
import { fisherYatesShuffler } from "./fisher-yates";
import { roundFunction } from "./round-function";

export function feistelEncryptRound(data: Block128, key: Block128): Block128 {
    let left = data.getLeftHalf();
    let right = data.getRightHalf();

    left = fisherYatesShuffler(left, key, false);
    right = fisherYatesShuffler(right, key, false);

    let encryptedLeft = right;
    let encryptedRight = roundFunction(right, key);
    encryptedRight = encryptedRight.xor(left);

    return Block128.fromHalves(encryptedLeft, encryptedRight);
}

export function feistelDecryptRound(data: Block128, key: Block128): Block128 {
    let left = data.getLeftHalf();
    let right = data.getRightHalf();
    
    let decryptedRight = left;
    let decryptedLeft = roundFunction(decryptedRight, key);
    decryptedLeft = decryptedLeft.xor(right);

    decryptedLeft = fisherYatesShuffler(decryptedLeft, key, true);
    decryptedRight = fisherYatesShuffler(decryptedRight, key, true);

    return Block128.fromHalves(decryptedLeft, decryptedRight);
}
