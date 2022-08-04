import axios from 'axios';
import config from '../config';
import usersServices from './users.services';
import {UserAccount} from './users.services';

const mainInstance = axios.create({
  baseURL: config.mainApiUrl,
});

const login = async (identifier: string, password: string) => {
  const response = await mainInstance.post('/auth/local', {
    identifier,
    password,
  });

  return response.data;
};

const validateAccount = async (
  token: string,
  role: string[]
): Promise<UserAccount> => {
  const response = await usersServices.getUserAccount(token);

  if (response === null || typeof response === 'undefined') {
    throw new Error('Failed to retieve user account');
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
