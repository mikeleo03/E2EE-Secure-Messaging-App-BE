import { EllipticCurve, ECPoint } from './EllipticCurve';

function mod(n: bigint, p: bigint): bigint {
    return ((n % p) + p) % p;
}

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

function getRandomBigInt(bits: number): bigint {
    const bytes = Math.ceil(bits / 8);
    let randomHex = '';
    for (let i = 0; i < bytes; i++) {
        randomHex += ('00' + Math.floor(Math.random() * 256).toString(16)).slice(-2);
    }
    return BigInt('0x' + randomHex);
}

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

export function generateKeyPair(curve: EllipticCurve): { privateKey: bigint, publicKey: ECPoint } {
    const privateKey = getRandomBigInt(256);
    const publicKey = ecMultiply(new ECPoint(curve.Gx, curve.Gy), privateKey, curve);
    return { privateKey, publicKey };
}


export function computeSharedSecret(privateKey: bigint, publicKey: ECPoint, curve: EllipticCurve): ECPoint {
    return ecMultiply(publicKey, privateKey, curve);
}