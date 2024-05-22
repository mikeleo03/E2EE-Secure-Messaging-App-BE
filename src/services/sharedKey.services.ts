import {db} from '../database';
import {SharedKey} from '../models';

const sharedKeyRepository = db.getRepository(SharedKey);

const getSharedKeyByUser = async (user_id: string) => {
    return await sharedKeyRepository.findOne({
        where: {
            user_id: user_id,
        },
    });
};

const storeSharedKey = async (params: {
    username: string;
    sharedX: string;
    sharedY: string;
}) => {
    try {
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
                sharedX: params.sharedX,
                sharedY: params.sharedY,
                stored_datetime: new Date()
            });
        } else {
            // If yes, update it
            await sharedKeyRepository.update({
                user_id: params.username,
            }, {
                sharedX: params.sharedX,
                sharedY: params.sharedY,
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
    storeSharedKey,
    deleteSharedKey,
};
