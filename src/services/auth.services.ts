import axios from 'axios';
import config from '../config';

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

export default {login};
