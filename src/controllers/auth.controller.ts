import {Request, RequestHandler} from 'express';
import authServices from '../services/auth.services';
import { DLoginResponse, DUser, DUserFullData, DUsers } from '../utils/dev-user';
import { Payload, signToken } from '../utils/jwt';

interface RequestWithBody<T> extends Request {
  body: T;
}

// const login: RequestHandler = async (
//   req: RequestWithBody<{identifier: string; password: string}>,
//   res
// ) => {
//   const {identifier, password} = req.body;
//   try {
//     const response = await authServices.login(identifier, password);
//     res.json(response);
//   } catch (error) {
//     res.status(400).json('Invalid identifier or password');
//   }
// };

// Temporary implementation
// TODO: Implement this with proper authentication
const login: RequestHandler = async (
  req: RequestWithBody<{ identifier: string; password: string }>,
  res
) => {
  const { identifier, password } = req.body;

  try {
    const userDatas: DUserFullData[] = DUsers;
    const user = userDatas.find((user) => user.username === identifier);

    if (user === undefined) {
      throw new Error('Invalid identifier or password');
    } else if (user.password !== password) {
      throw new Error('Invalid identifier or password');
    }

    const payload: Payload = {
      username: user.username,
      email: user.email,
    };

    const token = signToken(payload);
    const userRes: DUser = {
      username: user.username,
      name: user.name,
      faculty: user.faculty,
      campus: user.campus,
      sex: user.sex,
    };

    const response: DLoginResponse = {
      jwt: token,
      user: userRes,
    };

    res.json(response);
  } catch (error) {
    res.status(400).json('Invalid identifier or password');
  }
}

export default {login};
