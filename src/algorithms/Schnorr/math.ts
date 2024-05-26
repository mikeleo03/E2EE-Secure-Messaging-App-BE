namespace SchnorrSignatureMath {
    export function getRandomBigInt(min: bigint, max: bigint): bigint {
        // Temporary random bigint generator, will be replaced with BBS
        if (min > max) {
            throw new RangeError('Minimum value cannot be greater than the maximum value');
        }

        const range = max - min + 1n;
        const bitsNeeded = range.toString(2).length;
        const bytesNeeded = Math.ceil(bitsNeeded / 8);
        const mask = (1n << BigInt(bitsNeeded)) - 1n;

        let randomValue;
        do {
            const randomBytes = new Uint8Array(bytesNeeded);
            crypto.getRandomValues(randomBytes);
            randomValue = BigInt('0x' + [...randomBytes].map(b => b.toString(16).padStart(2, '0')).join(''));
            randomValue &= mask;
        } while (randomValue >= range);

        return min + randomValue;
    }

    export function mod(a: bigint, b: bigint): bigint {
        return ((a % b) + b) % b;
    }

    export function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
        if (modulus === 1n) return 0n;

        let result = 1n;
        base = mod(base, modulus);
        
        while (exponent > 0) {
            if (exponent % 2n === 1n) {
                result = mod(result * base, modulus);
            }
            exponent = exponent >> 1n;
            base = mod(base * base, modulus);
        }
        
        return result;
    }

    export function modInverseModPrime(number: bigint, modulus: bigint): bigint {
        return modPow(number, modulus - 2n, modulus);
    }

}

export default SchnorrSignatureMath;