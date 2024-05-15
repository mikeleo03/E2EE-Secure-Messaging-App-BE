import { CryptoNight } from "../algorithms/cryptonight";

const encryptCryptoNightToHex = async (
    plaintext: string,
    key: string
): Promise<{ encrypted: string }> => {
    return {
        encrypted: await CryptoNight.encryptToHex(plaintext, key),
    };
};

const decryptCryptoNightFromHex = async (
    ciphertext: string,
    key: string
): Promise<{ decrypted: string }> => {
    return {
        decrypted: await CryptoNight.decryptFromHex(ciphertext, key),
    };
};

export default {
    encryptCryptoNightToHex,
    decryptCryptoNightFromHex,
};
