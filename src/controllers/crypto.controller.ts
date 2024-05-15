import { Request, RequestHandler } from 'express';
import cryptoServices from '../services/crypto.services';


interface RequestWithBody<T> extends Request {
  body: T;
}

const encryptCryptoNightToHex: RequestHandler = async (
  req: RequestWithBody<{ plaintext: string; key: string }>,
  res
) => {
  const { plaintext, key } = req.body;

  try {
    const response = await cryptoServices.encryptCryptoNightToHex(plaintext, key);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json('Invalid plaintext or key');
  }
};

const decryptCryptoNightFromHex: RequestHandler = async (
  req: RequestWithBody<{ ciphertext: string; key: string }>,
  res
) => {
  const { ciphertext, key } = req.body;

  try {
    const response = await cryptoServices.decryptCryptoNightFromHex(ciphertext, key);
    res.json(response);
  } catch (error) {
    res.status(400).json('Invalid ciphertext or key');
  }
};

export default {
  encryptCryptoNightToHex,
  decryptCryptoNightFromHex,
};
