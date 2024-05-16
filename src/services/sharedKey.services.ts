import {db} from '../database';
import {SharedKey} from '../models';

const sharedKeyRepository = db.getRepository(SharedKey);

const getSharedKeyByUser = async (user_id: string) => {
    return await sharedKeyRepository.find({
        where: {
            user_id: user_id,
        },
    });
};

const storeSharedKey = async (params: {
    user_id: string;
    sharedX: string;
    sharedY: string;
}) => {
    const storedSharedKey = await sharedKeyRepository.save({
        user_id: params.user_id,
        sharedX: params.sharedX,
        sharedY: params.sharedY,
        stored_datetime: new Date()
    });

    return storedSharedKey;
};

const updateSharedKey = async (params: {
    user_id: string;
    sharedX: string;
    sharedY: string;
}) => {
  try {
    const updatedSharedKey = await sharedKeyRepository.save({
        user_id: params.user_id,
        sharedX: params.sharedX,
        sharedY: params.sharedY,
        stored_datetime: new Date()
    });

    return updatedSharedKey;
  } catch (error) {
    console.log(error);
    return [];
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
    storeSharedKey,
    updateSharedKey,
    deleteSharedKey,
};
