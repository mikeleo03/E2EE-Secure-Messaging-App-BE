import axios from 'axios';
import config from '../config';

interface User {
  username: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  name: string,
  sex: string,
  campus: string,
  faculty: string,
  email: string
}

const mainInstance = axios.create({
  baseURL: config.mainApiUrl,
});

const getUser = async (token: string): Promise<User> => {
  try {
    const response = await mainInstance.get('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json',
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to retieve user data');
    }

    const data = response.data;
    if (data == null) {
      throw new Error('Failed to retieve user data');
    }

    const user: User = {
      username: data.username,
      provider: data.provider,
      confirmed: data.confirmed,
      blocked: data.blocked,
      name: data.name,
      sex: data.sex,
      campus: data.campus,
      faculty: data.faculty,
      email: data.email,
    }
  
    return user;
  } catch (error) {
    throw error;
  }
};

export default {getUser};