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

const generateSharedKey: RequestHandler = async (
    req: RequestWithBody<{ username: string }>,
    res
) => {
    const { username } = req.body;

    try {
        const response = await sharedKeyServices.generateSharedKey({
            username: username,
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
    generateSharedKey,
    deleteSharedKey,
};
