import axios from 'axios';
import config from '../config';

interface User {
  username: string;
  name: string;
  faculty: string;
  campus: string;
  sex: string;
}

export interface UserAccount extends User {
  role: string;
}

interface UserProfile extends User {
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  email: string;
}

const mainInstance = axios.create({
  baseURL: config.mainApiUrl,
});

const getUserAccount = async (token: string): Promise<UserAccount> => {
  const response = await mainInstance.get('/users/my-account', {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to retieve user account');
  }

  const data = response.data;
  if (data === null || typeof data === 'undefined') {
    throw new Error('Failed to retieve user account');
  }

  const account: UserAccount = {
    username: data.username,
    name: data.name,
    faculty: data.faculty,
    campus: data.campus,
    sex: data.sex,
    role: data.role,
  };

  return account;
};

const getUserProfile = async (token: string): Promise<UserProfile> => {
  const response = await mainInstance.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to retieve user profile');
  }

  const data = response.data;
  if (data === null || typeof data === 'undefined') {
    throw new Error('Failed to retieve user profile');
  }

  const profile: UserProfile = {
    username: data.username,
    provider: data.provider,
    confirmed: data.confirmed,
    blocked: data.blocked,
    name: data.name,
    sex: data.sex,
    campus: data.campus,
    faculty: data.faculty,
    email: data.email,
  };

  return profile;
};

export default {
  getUserAccount,
  getUserProfile,
};
