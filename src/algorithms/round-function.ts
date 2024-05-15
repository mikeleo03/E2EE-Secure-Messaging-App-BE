import * as crypto from 'crypto';
import { Block64 } from '../models/Blocks/Block64';
import { fisherYatesShuffler } from './fisher-yates';
import { Block128 } from '../models/Blocks/Block128';

/**
 * Hash-based Message Authentication Code (HMAC) using SHA-256
 * @param {string} data
 * @param {string} key
 * @returns {string}
 */
function hmacSHA256(data: string, key: string): string {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data);
    return hmac.digest('hex');
}

/**
 * Feistel round function for CryptoNight Block Cipher
 */
export function roundFunction(data: Block64, key: Block128): Block64 {
    let processed_data: Block64 = data.copy();
    processed_data = fisherYatesShuffler(processed_data, key, false);
    const hashResult: string = hmacSHA256(processed_data.getHexData(), key.getHexData());

    let result: string = "";
    for (let i = 0; i < hashResult.length / 4; i++) {
        const first_byte = parseInt(hashResult.slice(i * 4, i * 4 + 1), 16);
        const second_byte = parseInt(hashResult.slice(i * 4 + 1, i * 4 + 2), 16);
        const third_byte = parseInt(hashResult.slice(i * 4 + 2, i * 4 + 3), 16);
        const fourth_byte = parseInt(hashResult.slice(i * 4 + 3, i * 4 + 4), 16);

        const xor_result = first_byte ^ second_byte ^ third_byte ^ fourth_byte;
        result += xor_result.toString(16);
    }

    return Block64.fromHex(result);
}