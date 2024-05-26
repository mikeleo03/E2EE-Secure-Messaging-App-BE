import * as CryptoJS from 'crypto-js';


export function hash_message(message: string, x: string, p: bigint): bigint {
    const hash = CryptoJS.SHA256(message + x).toString();
    return BigInt('0x' + hash) % p;
}

export function bigintToString(bigint: bigint): string {
    return bigint.toString();
}

export function stringToBigint(string: string): bigint {
    return BigInt(string);
}