import {Request, RequestHandler, Response} from 'express';
import authServices from '../services/auth.services';
import usersServices from '../services/users.services';
import errorHandler from '../utils/error.handler';

const getUserProfile: RequestHandler = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authServices.getAuthHeader(authHeader);

  try {
    const response = await usersServices.getUserProfile(token);

    res.json(response);
  } catch (error) {
    errorHandler.handleResponseError(res, error);
  }
};

export default {getUserProfile};
