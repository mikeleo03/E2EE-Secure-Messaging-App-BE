import {Request, RequestHandler, Response} from 'express';
import authServices from '../services/auth.services';
import usersServices from '../services/users.services';
import errorHandler from '../utils/error.handler';

const getUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const authHeader = req.headers.authorization;

  const token = authServices.getAuthHeader(authHeader);
  if (token === null) {
    res.sendStatus(401);
    return;
  }

  try {
    const response = await usersServices.getUser(token);

    res.json(response);
  } catch (error) {
    errorHandler.handleResponseError(res, error);
  }
};

export default {getUser};