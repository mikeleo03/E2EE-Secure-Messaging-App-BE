import { Request, RequestHandler } from 'express';
import SchnorrSignature from '../algorithms/Schnorr/schnorr_signature';
import { unicodeToHex } from '../utils/string_converter';

interface RequestWithBody<T> extends Request {
  body: T;
}

const testFunction: RequestHandler = async (
  req: RequestWithBody<{ plaintext: string }>,
  res
) => {
  try {
    const message = req.body.plaintext;

    const keyPair = SchnorrSignature.generateKeyPair();
    const privateKey = keyPair[0];
    const publicKey = keyPair[1];

    const hexMessage = "0x" + unicodeToHex(message);

    const signature = SchnorrSignature.generateSchnorrSignature(BigInt(hexMessage), privateKey);
    const verified = SchnorrSignature.verifySchnorrSignature(BigInt(hexMessage), signature, publicKey);

    const hexSignature = signature.map((x) => x.toString(16));

    res.status(200).json({ hexSignature, verified });
  } catch (error) {
    console.log(error);
    res.status(400).json('Invalid plaintext or key');
  }
};

export default {
  testFunction,
};