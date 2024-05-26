const p: bigint = BigInt("0xd80ecf1480f3fccb190a97c9317d24e010ad9dc57998b130c4a59774f4258475c6e7b07d1b12df9880103482ecdb7fe550a57dd210ceef86d1b17a32ce526b152d6b8d13631c85ec241be5fe9a849b562fb0a5f82d8ee923a0c4bb5356d987261f725d8412dde6140ef3bb763987449ca7518068c087d7af9d80495dde679149");
const q: bigint = BigInt("0xd68875ddb8049d5107aad27effd6d571a936b2a20c826856486feb552b53bf294f6e6b77eee4e4d054ec7dadf5c8bb12863937e174c8b6bb5f80923d284fa9e5");
const alpha: bigint = BigInt("0x3dbef7abaf2e9f6f01ac8f1a4334fdacaa7b7c7e9ffcb04a226371edfec371f9d2c9e92af8c7530256c511e5dca166920e77f227393243213987dc69d6a9f79f41b6722d7a4e1af5abe2ccac52a92a7e66728fb9dfcedc83643491417fd686980561a2f49c34d4cfe7cc386421f044cdde73c595c3e0ade9565006e2840317c9");

export class SchnorrGlobalPubKey {
    p: bigint;
    q: bigint;
    alpha: bigint;
    
    constructor(p: bigint, q: bigint, alpha: bigint) {
        this.p = p;
        this.q = q;
        this.alpha = alpha;
    }
}

export const globalPubKey = new SchnorrGlobalPubKey(p, q, alpha);