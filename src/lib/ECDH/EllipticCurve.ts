export class EllipticCurve {
    a: bigint;
    b: bigint;
    p: bigint;
    n: bigint;
    Gx: bigint;
    Gy: bigint;

    constructor() {
        this.a = BigInt(0);
        this.b = BigInt(7);
        this.p = BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f');
        this.n = BigInt('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141');
        this.Gx = BigInt('0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798');
        this.Gy = BigInt('0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8');
    }
}

export class ECPoint {
    x: bigint;
    y: bigint;

    constructor(x: bigint, y: bigint) {
        this.x = x;
        this.y = y;
    }

    isInfinity(): boolean {
        return this.x === BigInt(0) && this.y === BigInt(0);
    }
}