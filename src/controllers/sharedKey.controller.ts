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
    req: RequestWithBody<{ username: string; sharedX: string; sharedY: string; }>,
    res
) => {
    const { username, sharedX, sharedY } = req.body;

    try {
        const response = await sharedKeyServices.storeSharedKey({
            username: username,
            sharedX: sharedX,
            sharedY: sharedY,
        });

        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json('Error while storing the shared key');
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
    deleteSharedKey,
};
