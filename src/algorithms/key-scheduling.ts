import { Block128 } from "../models/Blocks/Block128";
import { fisherYatesShuffler } from "./fisher-yates";

export function generateRoundKeys(key: Block128, rounds: number): Block128[] {
  const keys = new Array<Block128>(rounds);

  // Set initial key for 1st round
  keys[0] = key.copy();

  // Iteration for key every round
  // Using seed from prev key to output newest key
  for (let i = 1; i < rounds; i++) {
    let seed = keys[i - 1];
    
    let currentLeftKeyData = fisherYatesShuffler(
      seed.getLeftHalf(),
      seed,
      false
    );
    
    let currentRightKeyData = fisherYatesShuffler(
      seed.getRightHalf(),
      seed,
      true
    );

    keys[i] = Block128.fromHalves(currentLeftKeyData, currentRightKeyData);
  }
  
  return keys;
}
