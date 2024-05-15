import axios from 'axios';
import config from '../config';
import usersServices from './users.services';
import {UserAccount} from './users.services';
import { DLoginResponse, DUser, DUserFullData, DUsers } from '../utils/dev-user';
import { Payload, signToken } from '../utils/jwt';

// const mainInstance = axios.create({
//   baseURL: config.mainApiUrl,
// });

// const login = async (identifier: string, password: string) => {
//   const response = await mainInstance.post('/auth/local', {
//     identifier,
//     password,
//   });

//   return response.data;
// };

// Temporary implementation
// TODO: Implement this with proper authentication
const login = async (identifier: string, password: string) => {
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

  return response;
}

const validateAccount = async (
  token: string,
  role: string[]
): Promise<UserAccount> => {
  const response = await usersServices.getUserAccount(token);

  if (response === null || typeof response === 'undefined') {
    throw new Error('Failed to retrieve user account');
  }

  if (!role.includes(response.role)) {
    throw new Error('Invalid role');
  }

  return response;
};

const validateAdmin = async (
  token: string,
  role: string
): Promise<UserAccount> => {
  const response = await usersServices.getUserAccount(token);

  if (response === null || typeof response === 'undefined') {
    throw new Error('Failed to retrieve user account');
  }

  if (!role.includes(response.role)) {
    throw new Error('Invalid role');
  }

  return response;
};

const getAuthHeader = (authHeader: string | string[]): string => {
  if (authHeader === null || typeof authHeader === 'undefined') {
    return null;
  }

  const authString = authHeader.toString();
  const split = authString.split(' ');
  if (split.length === 2) {
    return authString.split(' ')[1];
  }

  return authString.split(' ')[0];
};

export default {
  login,
  validateAccount,
  validateAdmin,
  getAuthHeader,
};
