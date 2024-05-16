// import {mod, modPow, inverseMod, getRandomBigInt} from '../Math/MathUtil';

// function gcd(a: bigint, b: bigint): bigint {
//   while (b !== BigInt(0)) {
//     [a, b] = [b, a % b];
//   }
//   return a;
// }

// function isPrime(num: bigint): bool {
//   if (num <= BigInt(1)) return false;
//   if (num <= BigInt(3)) return true;

//   if (num % BigInt(2) === BigInt(0) || num % BigInt(3) === BigInt(0))
//     return false;

//   for (let i = BigInt(5); i * i <= num; i += BigInt(6)) {
//     if (num % i === BigInt(0) || num % (i + BigInt(2)) === BigInt(0))
//       return false;
//   }

//   return true;
// }

// function initializeBBS(bits: number) {
//   const p = generatePrime(bits);
//   const q = generatePrime(bits);
//   const M = p * q;
//   let s;

//   do {
//     s = getRandomBigInt(bits);
//   } while (gcd(s, M) !== BigInt(1));

//   return {p, q, M, s};
// }

// function generatePrime(bits: number): bigint {
//   let prime;
//   do {
//     prime = getRandomBigInt(bits);
//   } while (!isPrime(prime) || prime % BigInt(4) !== BigInt(3));
//   return prime;
// }

// function generateBBS(bits: number, length: number): string {
//   const {M, s} = initializeBBS(bits);
//   let x = mod(s * s, M);
//   let result = '';

//   for (let i = 0; i < length; i++) {
//     x = mod(x * x, M);
//     result += (x & BigInt(1)).toString();
//   }

//   return result;
// }

// // const bits = 512;
// // const length = 128;

// // console.log("Random bits: ", generateBBS(bits, length));
