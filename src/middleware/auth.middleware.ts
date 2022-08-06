import {Request, Response} from 'express';
import {Socket} from 'socket.io';
import config from '../config';
import authServices from '../services/auth.services';
import errorHandler from '../utils/error.handler';

const authMiddleware = async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;

  const token = authServices.getAuthHeader(authHeader);
  if (token === null) {
    res.sendStatus(401);
    return;
  }

  try {
    await authServices.validateAccount(token, config.activeRole);
    next();
  } catch (error) {
    errorHandler.handleResponseError(res, error);
  }
};

const authAdminMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const authHeader = req.headers.authorization;

  const token = authServices.getAuthHeader(authHeader);
  if (token === null) {
    res.sendStatus(401);
    return;
  }

  try {
    await authServices.validateAdmin(token, config.adminRole);
    next();
  } catch (error) {
    errorHandler.handleResponseError(res, error);
  }
};

const authSocketMiddleware = async (socket: Socket, next: Function) => {
  const token = socket.handshake.auth.token;

  if (token === null) {
    next(new Error('Unauthorized'));
    return;
  }

  try {
    const account = await authServices.validateAccount(
      token,
      config.activeRole
    );
    socket.data.username = account.username;
    socket.data.name = account.name;
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  authMiddleware,
  authAdminMiddleware,
  authSocketMiddleware,
};
