import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import authServices from '../services/auth.services';
import errorHandler from '../utils/error.handler';

const authMiddleware = async (
  req : Request, 
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
    const validToken = await authServices.validateToken(token);
    if (!validToken) {
      res.sendStatus(401);
      return;
    }
    next();
  } catch(error) {
    errorHandler.handleResponseError(res, error);
  }
}

const authSocketMiddleware = async (
  socket: Socket, 
  next: Function
) => {
  const authHeader = socket.handshake.auth.token;
    
  const token = authServices.getAuthHeader(authHeader);
  if (token === null) {
    next(new Error('Unauthorized'));
    return;
  }
  
  try {
    const validToken = await authServices.validateToken(token);
    if (!validToken) {
      next(new Error('Unauthorized'));
      return;
    }
    next();
  } catch(error) {
    next(error);
  }
}

export default {
  authMiddleware,
  authSocketMiddleware
};