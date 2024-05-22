import {db} from '../database';
import {SharedKey} from '../models';
import { generateKeyPair, computeSharedSecret, deriveKeys } from '../algorithms/ECDH/ECDHUtils';
import { EllipticCurve, ECPoint } from '../algorithms/ECC/EllipticCurve';
import { saveKeyToFile, readKeyFromFile, saveKeyPairToFile, readKeyPairFromFile } from '../algorithms/Utils/Storage';

const sharedKeyRepository = db.getRepository(SharedKey);
const curve = new EllipticCurve();

const getSharedKeyByUser = async (user_id: string) => {
    return await sharedKeyRepository.find({
        where: {
            user_id: user_id,
        },
    });
};

const generateSharedKey = async (params: {
    username: string;
}) => {
    try {
        // Generate the key between user and server
        // User's key pair
        const userKeys = generateKeyPair(curve);

        // Server's key pair
        const serverKeys = generateKeyPair(curve);

        // Compute shared secrets
        const userServerSharedSecret = computeSharedSecret(serverKeys.privateKey, userKeys.publicKey, curve);

        // Save User's shared key to a file
        saveKeyPairToFile(userServerSharedSecret.x, userServerSharedSecret.y, "keys/" + params.username + ".ecshared");

        // Save Server's shared key to database
        // First check whether there's sharedkey in the repo
        const sharedKey = await sharedKeyRepository.findOne({
            where: {
                user_id: params.username,
            },
        });

        if (!sharedKey) {
            // If not, save it
            await sharedKeyRepository.save({
                user_id: params.username,
                sharedX: userServerSharedSecret.x.toString(),
                sharedY: userServerSharedSecret.y.toString(),
                stored_datetime: new Date()
            });
        } else {
            // If yes, update it
            await sharedKeyRepository.update({
                user_id: params.username,
            }, {
                sharedX: userServerSharedSecret.x.toString(),
                sharedY: userServerSharedSecret.y.toString(),
                stored_datetime: new Date()
            });
        }

        return 200;
    } catch (error) {
        console.log(error);
        return 500;
    }
};

const deleteSharedKey = async (params: {user_id: string}) => {
    try {
        // Check if shared Key exist
        await sharedKeyRepository.findOneOrFail({
            where: {
                user_id: params.user_id,
            },
        });
    
        return await sharedKeyRepository.delete({
            user_id: params.user_id,
        });
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default {
    getSharedKeyByUser,
    generateSharedKey,
    deleteSharedKey,
};
