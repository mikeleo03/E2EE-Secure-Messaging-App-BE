import { CryptoNight } from "../algorithms/cryptonight";


const encryptCryptoNight = async (
    plaintext: string,
    key: string
): Promise<string> => {
    return CryptoNight.encrypt(plaintext, key);
};

const decryptCryptoNight = async (
    ciphertext: string,
    key: string
): Promise<string> => {
    return CryptoNight.decrypt(ciphertext, key);
};

export default {
    encryptCryptoNight,
    decryptCryptoNight,
};
