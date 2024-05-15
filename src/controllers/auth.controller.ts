import {Request, RequestHandler} from 'express';
import authServices from '../services/auth.services';
import { DLoginResponse, DUser, DUserFullData, DUsers } from '../utils/dev-user';
import { Payload, signToken } from '../utils/jwt';

interface RequestWithBody<T> extends Request {
  body: T;
}

const login: RequestHandler = async (
  req: RequestWithBody<{identifier: string; password: string}>,
  res
) => {
  const {identifier, password} = req.body;
  try {
    const response = await authServices.login(identifier, password);
    res.json(response);
  } catch (error) {
    res.status(400).json('Invalid identifier or password');
  }
};

export default {login};
