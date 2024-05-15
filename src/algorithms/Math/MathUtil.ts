/**
 * Computes the modular reduction.
 * @param {bigint} n - The number to reduce.
 * @param {bigint} p - The modulus.
 * @returns {bigint} The result of n mod p.
 */
export function mod(n: bigint, p: bigint): bigint {
    return ((n % p) + p) % p;
}

/**
 * Computes the modular exponentiation.
 * @param {bigint} base - The base.
 * @param {bigint} exponent - The exponent.
 * @param {bigint} modulus - The modulus.
 * @returns {bigint} The result of base^exponent mod modulus.
 */
export function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
    let result = BigInt(1);
    base = mod(base, modulus);
    while (exponent > BigInt(0)) {
        if (exponent % BigInt(2) === BigInt(1)) {
            result = mod(result * base, modulus);
        }
        exponent >>= BigInt(1);
        base = mod(base * base, modulus);
    }
    return result;
}

/**
 * Computes the modular inverse.
 * @param {bigint} n - The number to invert.
 * @param {bigint} p - The modulus.
 * @returns {bigint} The modular inverse of n mod p.
 */
export function inverseMod(n: bigint, p: bigint): bigint {
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
export function getRandomBigInt(bits: number): bigint {
    const bytes = Math.ceil(bits / 8);
    let randomHex = '';
    for (let i = 0; i < bytes; i++) {
        randomHex += ('00' + Math.floor(Math.random() * 256).toString(16)).slice(-2);
    }
    return BigInt('0x' + randomHex);
}