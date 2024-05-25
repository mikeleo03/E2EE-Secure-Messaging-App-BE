import { Request, RequestHandler } from 'express';
import { generateBBS } from '../algorithms/BBS/BBS';
import { decryptMessage, encryptMessage } from '../algorithms/ECC/ECCUtils';
import { ECPoint } from '../algorithms/ECC/EllipticCurve';

interface RequestWithBody<T> extends Request {
  body: T;
}

const testFunction: RequestHandler = async (
  req: RequestWithBody<{ plaintext: string; key: string }>,
  res
) => {
  try {
    const { plaintext, key } = req.body;
    const keyEC: ECPoint = ECPoint.fromString(key);
    const ciphertext = encryptMessage(plaintext, keyEC);
    res.status(200).json(ciphertext);
  } catch (error) {
    console.log(error);
    res.status(400).json('Invalid plaintext or key');
  }
};

export default {
  testFunction,
};