import {mod, getRandomBigInt} from '../Utils/Math';
import {create, all} from 'mathjs';

const math = create(all);

function gcd(a: bigint, b: bigint): bigint {
  while (b !== BigInt(0)) {
    [a, b] = [b, a % b];
  }
  return a;
}

function isPrimeBigInt(num: bigint): boolean {
  return math.isPrime(math.bignumber(num.toString()));
}

function generatePrime(bits: number): bigint {
  console.log('WOW 1');
  let prime: bigint;
  console.log('WOW 2');
  do {
    console.log('WOW 3');
    prime = getRandomBigInt(bits);
    console.log('WOW 4', prime);
  } while (!isPrimeBigInt(prime) || prime % BigInt(4) !== BigInt(3));
  console.log('WOW 5');
  return prime;
}

function initializeBBS(bits: number) {
  console.log('TES 1');
  const p = generatePrime(bits);
  console.log('TES 2');
  const q = generatePrime(bits);
  const M = p * q;
  let s: bigint;

  do {
    s = getRandomBigInt(bits);
  } while (gcd(s, M) !== BigInt(1));

  return {p, q, M, s};
}

function generateBBS(bits: number, length: number): string {
  console.log('MASUK 1');
  const {M, s} = initializeBBS(bits);
  console.log('MASUK 2');
  let x = mod(s * s, M);
  console.log('MASUK 3');
  let result = '';
  console.log('MASUK 4');

  for (let i = 0; i < length; i++) {
    console.log('MASUK 5');
    x = mod(x * x, M);
    console.log('MASUK 6');
    result += (x & BigInt(1)).toString();
    console.log('MASUK 7');
  }
  console.log('MASUK 8');

  return result;
}

// Contoh penggunaan
const bits = 512;
const length = 128;

console.log('Random bits: ', generateBBS(bits, length));
