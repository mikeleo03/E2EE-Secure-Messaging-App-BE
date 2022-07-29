import axios from 'axios';
import config from '../config';
import usersServices from './users.services';

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

const validateToken = async (token: string): Promise<boolean>  => {
  try {
    const response = await usersServices.getUser(token);

    return response != null && typeof response != 'undefined';
  } catch (error) { 
    throw error;
  }
}

const getAuthHeader = (authHeader: string | string[]): string => {
  if (authHeader === null || typeof authHeader === 'undefined') {
    return null;
  }

  const authString = authHeader.toString();
  const split = authString.split(' ');
  if (split.length == 2) {
    return authString.split(' ')[1];
  }

  return authString.split(' ')[0];
}

export default {
  login,
  validateToken,
  getAuthHeader
};