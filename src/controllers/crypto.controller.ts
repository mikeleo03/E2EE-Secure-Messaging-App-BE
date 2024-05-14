import { Request, RequestHandler } from 'express';
import cryptoServices from '../services/crypto.services';


interface RequestWithBody<T> extends Request {
  body: T;
}

const encryptCryptoNight: RequestHandler = async (
  req: RequestWithBody<{ plaintext: string; key: string }>,
  res
) => {
  const { plaintext, key } = req.body;

  try {
    const response = await cryptoServices.encryptCryptoNight(plaintext, key);
    res.json(response);
  } catch (error) {
    res.status(400).json('Invalid plaintext or key');
  }
};

const decryptCryptoNight: RequestHandler = async (
  req: RequestWithBody<{ ciphertext: string; key: string }>,
  res
) => {
  const { ciphertext, key } = req.body;

  try {
    const response = await cryptoServices.decryptCryptoNight(ciphertext, key);
    res.json(response);
  } catch (error) {
    res.status(400).json('Invalid ciphertext or key');
  }
};

export default {
  encryptCryptoNight,
  decryptCryptoNight,
};
