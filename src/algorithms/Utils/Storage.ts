import * as fs from 'fs';
import { ECPoint } from '../ECC/EllipticCurve';

/**
 * Save single key point to a file
 * @param {bigint} key - The key value to safe.
 * @param {string} filename - The complete path of the file to store the key point
 */
export function saveKeyToFile(key: bigint, filename: string) {
    fs.writeFileSync(filename, key.toString());
}

/**
 * Read single key point from a file
 * @param {string} filename - The complete path of the file where the key is stored
 * @returns {bigint} The single key point stored on the file.
 */
export function readKeyFromFile(filename: string): bigint {
    const keyString = fs.readFileSync(filename, 'utf-8');
    return BigInt(keyString.trim()); // Convert the string to a bigint
}

/**
 * Save key pair point to a file
 * @param {bigint} privateKey_x - The x key value to safe.
 * @param {bigint} privateKey_y - The y key value to safe.
 * @param {string} filename - The complete path of the file to store the key point
 */
export function saveKeyPairToFile(privateKey_x: bigint, privateKey_y: bigint, filename: string) {
    const data = JSON.stringify({ x: privateKey_x.toString(), y: privateKey_y.toString() });
    fs.writeFileSync(filename, data);
}

/**
 * Read key pair point from a file
 * @param {string} filename - The complete path of the file where the key is stored
 * @returns {ECPoint} The key pair point stored on the file.
 */
export function readKeyPairFromFile(filename: string): ECPoint {
    const data = fs.readFileSync(filename, 'utf-8');
    const { x, y } = JSON.parse(data);
    return new ECPoint(BigInt(x as string), BigInt(y as string));
}