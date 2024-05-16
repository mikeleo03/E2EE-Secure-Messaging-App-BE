import { EllipticCurve, ECPoint } from '../ECC/EllipticCurve';
import { mod, inverseMod, getRandomBigInt } from '../Utils/Math';

/**
 * Adds two points on the elliptic curve.
 * @param {ECPoint} p1 - The first point.
 * @param {ECPoint} p2 - The second point.
 * @param {EllipticCurve} curve - The elliptic curve parameters.
 * @returns {ECPoint} The result of adding p1 and p2.
 */
export function ecAdd(p1: ECPoint, p2: ECPoint, curve: EllipticCurve): ECPoint {
    if (p1.isInfinity()) return p2;
    if (p2.isInfinity()) return p1;

    const p = curve.p;
    let slope: bigint;
    
    if (p1.x === p2.x && p1.y === p2.y) {
        const numerator = mod(BigInt(3) * p1.x ** BigInt(2) + curve.a, p);
        const denominator = mod(BigInt(2) * p1.y, p);
        slope = mod(numerator * inverseMod(denominator, p), p);
    } else {
        const numerator = mod(p2.y - p1.y, p);
        const denominator = mod(p2.x - p1.x, p);
        slope = mod(numerator * inverseMod(denominator, p), p);
    }

    const x3 = mod(slope ** BigInt(2) - p1.x - p2.x, p);
    const y3 = mod(slope * (p1.x - x3) - p1.y, p);

    return new ECPoint(x3, y3);
}

/**
 * Multiplies a point on the elliptic curve by a scalar.
 * @param {ECPoint} point - The point to multiply.
 * @param {bigint} scalar - The scalar to multiply by.
 * @param {EllipticCurve} curve - The elliptic curve parameters.
 * @returns {ECPoint} The result of multiplying the point by the scalar.
 */
export function ecMultiply(point: ECPoint, scalar: bigint, curve: EllipticCurve): ECPoint {
    let result = new ECPoint(BigInt(0), BigInt(0)); // Point at infinity
    let addend = point;

    while (scalar > 0) {
        if (scalar & BigInt(1)) {
            result = ecAdd(result, addend, curve);
        }
        addend = ecAdd(addend, addend, curve);
        scalar >>= BigInt(1);
    }

    return result;
}

/**
 * Generates a key pair for elliptic curve cryptography.
 * @param {EllipticCurve} curve - The elliptic curve parameters.
 * @returns {object} An object containing the private and public keys.
 */
export function generateKeyPair(curve: EllipticCurve): { privateKey: bigint, publicKey: ECPoint } {
    const privateKey = getRandomBigInt(256);
    const publicKey = ecMultiply(new ECPoint(curve.Gx, curve.Gy), privateKey, curve);
    return { privateKey, publicKey };
}

/**
 * Computes the shared secret using the private key and the public key.
 * @param {bigint} privateKey - The private key.
 * @param {ECPoint} publicKey - The public key.
 * @param {EllipticCurve} curve - The elliptic curve parameters.
 * @returns {ECPoint} The computed shared secret.
 */
export function computeSharedSecret(privateKey: bigint, publicKey: ECPoint, curve: EllipticCurve): ECPoint {
    return ecMultiply(publicKey, privateKey, curve);
}

/**
 * A very basic hash function.
 * @param {string} data - The input data.
 * @returns {string} The hash of the input data.
 */
export function simpleHash(data: string): string {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        hash = (hash << 5) - hash + data.charCodeAt(i);
        hash |= 0;
    }
    return hash.toString(16).padStart(8, '0');
}

/**
 * Derives encryption key from the shared secret.
 * @param {ECPoint} sharedSecret - The shared secret.
 * @returns {string} A string containing the encryption key.
 */
export function deriveKeys(sharedSecret: ECPoint): string {
    const sharedSecretHex = sharedSecret.x.toString(16).padStart(64, '0') + sharedSecret.y.toString(16).padStart(64, '0');
    const hash = simpleHash(sharedSecretHex);

    return hash.slice(0, 16);  // 128-bit encryption key
}

/**
 * A very basic hash function.
 * @param {string} data - The input data.
 * @returns {Buffer} The hash of the input data.
 */
export function simpleHashBuffer(data: string): Buffer {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        hash = (hash << 5) - hash + data.charCodeAt(i);
        hash |= 0;
    }
    return Buffer.from(hash.toString(16).padStart(8, '0'), 'hex');
}

/**
 * Derives encryption key from the shared secret.
 * @param {ECPoint} sharedSecret - The shared secret.
 * @returns {Buffer} A buffer containing the encryption key.
 */
export function deriveKeysBuffer(sharedSecret: ECPoint): Buffer {
    const sharedSecretHex = sharedSecret.x.toString(16).padStart(64, '0') + sharedSecret.y.toString(16).padStart(64, '0');
    const hash = simpleHashBuffer(sharedSecretHex);

    return hash.slice(0, 16);  // 128-bit encryption key
}