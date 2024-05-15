import { EllipticCurve, ECPoint } from '../ECC/EllipticCurve';

/**
 * Computes the modular reduction.
 * @param {bigint} n - The number to reduce.
 * @param {bigint} p - The modulus.
 * @returns {bigint} The result of n mod p.
 */
function mod(n: bigint, p: bigint): bigint {
    return ((n % p) + p) % p;
}

/**
 * Computes the modular inverse.
 * @param {bigint} n - The number to invert.
 * @param {bigint} p - The modulus.
 * @returns {bigint} The modular inverse of n mod p.
 */
function inverseMod(n: bigint, p: bigint): bigint {
    if (n === BigInt(0)) throw new Error('Divide by zero');
    let [lm, hm] = [BigInt(1), BigInt(0)];
    let [low, high] = [mod(n, p), p];

    while (low > BigInt(1)) {
        const ratio = high / low;
        [lm, hm] = [hm - lm * ratio, lm];
        [low, high] = [high - low * ratio, low];
    }

    return mod(lm, p);
}

/**
 * Generates a random big integer with the specified number of bits.
 * @param {number} bits - The number of bits.
 * @returns {bigint} The generated random big integer.
 */
function getRandomBigInt(bits: number): bigint {
    const bytes = Math.ceil(bits / 8);
    let randomHex = '';
    for (let i = 0; i < bytes; i++) {
        randomHex += ('00' + Math.floor(Math.random() * 256).toString(16)).slice(-2);
    }
    return BigInt('0x' + randomHex);
}

/**
 * Adds two points on the elliptic curve.
 * @param {ECPoint} p1 - The first point.
 * @param {ECPoint} p2 - The second point.
 * @param {EllipticCurve} curve - The elliptic curve parameters.
 * @returns {ECPoint} The result of adding p1 and p2.
 */
function ecAdd(p1: ECPoint, p2: ECPoint, curve: EllipticCurve): ECPoint {
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
function ecMultiply(point: ECPoint, scalar: bigint, curve: EllipticCurve): ECPoint {
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