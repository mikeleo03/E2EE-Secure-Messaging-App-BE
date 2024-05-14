import { Block128 } from "../models/Blocks/Block128";

export function shiftBlock(block: Block128, shift: number): Block128 {
    const size = block.getData().length;
    const data: Uint8Array = new Uint8Array(size);

    for (let i = 0; i < size; i++) {
        data[i] = block.getData()[(i + shift) % size];
    }

    return new Block128(data);
}

export function inverseShiftBlock(block: Block128, shift: number): Block128 {
    const size = block.getData().length;
    return shiftBlock(block, size - shift);
}
