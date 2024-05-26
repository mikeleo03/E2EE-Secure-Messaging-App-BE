import { globalPubKey } from "./global_pub_key";
import { hash_message } from "./utils";
import SchnorrSignatureMath from "./math";


namespace SchnorrSignature {
    export function generateKeyPair(): [bigint, bigint] {
        const { p, q, alpha } = globalPubKey;

        const s = SchnorrSignatureMath.getRandomBigInt(1n, q - 1n);
        const alphaInverse = SchnorrSignatureMath.modInverseModPrime(alpha, p);
        const v = SchnorrSignatureMath.modPow(alphaInverse, s, p);

        return [s, v];
    }


    export function generateSchnorrSignature(message: bigint, s: bigint): bigint[] {
        if (s <= 0 || s >= globalPubKey.q) throw new Error('Invalid private key');

        const { p, q, alpha } = globalPubKey;
        const r = SchnorrSignatureMath.getRandomBigInt(1n, q - 1n);
        const x = SchnorrSignatureMath.modPow(alpha, r, p);
        const e = hash_message(message.toString(), x.toString(), q);
        const y = SchnorrSignatureMath.mod(r + s * e, q);

        return [e, y];
    }

    export function verifySchnorrSignature(message: bigint, signature: bigint[], v: bigint): boolean {
        const { p, q, alpha } = globalPubKey;
        const [ e, y ] = signature;

        if (y <= 0 || y >= q) return false;

        const x = SchnorrSignatureMath.mod(SchnorrSignatureMath.modPow(alpha, y, p) * SchnorrSignatureMath.modPow(v, e, p), p);
        const ePrime = hash_message(message.toString(), x.toString(), p);

        return e === ePrime;
    }
}

export default SchnorrSignature;
