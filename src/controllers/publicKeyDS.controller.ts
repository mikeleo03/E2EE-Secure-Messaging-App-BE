import { Request, RequestHandler } from "express";
import { readKeyFromFile } from "../algorithms/Utils/Storage";

const getDigitalSignPublicKey: RequestHandler = async (
  req,
  res
) => {
  try {
    const username = req.params.username;
    const publicKey = readKeyFromFile(`./keys/${username}.scpub`);

    if (publicKey === BigInt(-1)) {
      throw new Error("No public key found for the user");
    }

    const publicKeyString = publicKey.toString();
    res.status(200).json({ publicKeyString });
  } catch (error) {
    console.log(error);
    res.status(400).json("No public key found for the user");
  }
}

export default {
  getDigitalSignPublicKey,
};