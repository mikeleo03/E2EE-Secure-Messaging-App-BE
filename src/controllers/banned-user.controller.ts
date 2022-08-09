import {Request, RequestHandler} from 'express';
import bannedUserServices from '../services/banned-user.services';

interface RequestWithBody<T> extends Request {
  body: T;
}

const banUser: RequestHandler = async (
  req: RequestWithBody<{identifier: string}>,
  res
) => {
  const {identifier} = req.body;
  try {
    const response = await bannedUserServices.addBannedUser({identifier});
    res.json(response);
  } catch (error) {
    res.status(400).json('Invalid identifier or password');
  }
};

export default {banUser};
