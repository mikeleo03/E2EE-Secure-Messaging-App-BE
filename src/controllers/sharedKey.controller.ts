import { Request, RequestHandler } from 'express';
import sharedKeyServices from '../services/sharedKey.services';

interface RequestWithBody<T> extends Request {
  body: T;
}

const getSharedKeyByUser: RequestHandler = async (
    req: RequestWithBody<{ user_id: string }>,
    res
) => {
    const { user_id } = req.body;

    try {
        const response = await sharedKeyServices.getSharedKeyByUser(user_id);

        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json('Error while getting shared key');
    }
};

const storeSharedKey: RequestHandler = async (
    req: RequestWithBody<{ user_id: string; sharedX: string, sharedY: string }>,
    res
) => {
    const { user_id, sharedX, sharedY } = req.body;

    try {
        const response = await sharedKeyServices.storeSharedKey({
            user_id: user_id,
            sharedX: sharedX,
            sharedY: sharedY
        });

        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json('Error while storing the shared key');
    }
};

const updateSharedKey: RequestHandler = async (
    req: RequestWithBody<{ user_id: string; sharedX: string, sharedY: string }>,
    res
) => {
    const { user_id, sharedX, sharedY } = req.body;

    try {
        const response = await sharedKeyServices.updateSharedKey({
            user_id: user_id,
            sharedX: sharedX,
            sharedY: sharedY
        });

        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json('Error while updating the shared key');
    }
};

const deleteSharedKey: RequestHandler = async (
    req: RequestWithBody<{ user_id: string }>,
    res
) => {
    const { user_id } = req.body;

    try {
        const response = await sharedKeyServices.deleteSharedKey({
            user_id: user_id
        });

        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json('Error while deleting the shared key');
    }
};

export default {
    getSharedKeyByUser,
    storeSharedKey,
    updateSharedKey,
    deleteSharedKey,
};
