import {Request, Response} from 'express';
import {Socket} from 'socket.io';
import config from '../config';
import authServices from '../services/auth.services';
import bannedUserServices from '../services/banned-user.services';
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
    next();
  } catch (error) {
    next(error);
  }
};

const authBannedUserMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const {identifier} = req.body;
  try {
    const bannedUser = await bannedUserServices.checkBannedUser({
      identifier,
    });

    if (!bannedUser) {
      next();
    } else {
      return res.send({
        error: {
          message: 'User is banned',
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  authMiddleware,
  authAdminMiddleware,
  authSocketMiddleware,
  authBannedUserMiddleware,
};
