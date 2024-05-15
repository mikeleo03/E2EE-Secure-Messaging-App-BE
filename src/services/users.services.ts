import axios from 'axios';
import config from '../config';
import { Payload, verifyToken } from '../utils/jwt';
import { DUsers } from '../utils/dev-user';

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

// const mainInstance = axios.create({
//   baseURL: config.mainApiUrl,
// });

// const getUserAccount = async (token: string): Promise<UserAccount> => {
//   const response = await mainInstance.get('/users/my-account', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'content-type': 'application/json',
//     },
//   });

//   if (response.status !== 200) {
//     throw new Error('Failed to retieve user account');
//   }

//   const data = response.data;
//   if (data === null || typeof data === 'undefined') {
//     throw new Error('Failed to retieve user account');
//   }

//   const account: UserAccount = {
//     username: data.username,
//     name: data.name,
//     faculty: data.faculty,
//     campus: data.campus,
//     sex: data.sex,
//     role: data.role,
//   };

//   return account;
// };

// Temporary implementation
// TODO: Implement this after proper authentication setup
const getUserAccount = async (token: string): Promise<UserAccount> => {
  const payload: Payload = verifyToken(token);
  if (payload === null || typeof payload === 'undefined') {
    throw new Error('Failed to retrieve user account');
  }

  const user = DUsers.find((user) => user.username === payload.username);
  if (user === null || typeof user === 'undefined') {
    throw new Error('Failed to retrieve user account');
  }

  const account: UserAccount = {
    username: user.username,
    name: user.name,
    faculty: user.faculty,
    campus: user.campus,
    sex: user.sex,
    role: user.role,
  };

  return account;
};

// const getUserProfile = async (token: string): Promise<UserProfile> => {
//   const response = await mainInstance.get('/users/me', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'content-type': 'application/json',
//     },
//   });

//   if (response.status !== 200) {
//     throw new Error('Failed to retieve user profile');
//   }

//   const data = response.data;
//   if (data === null || typeof data === 'undefined') {
//     throw new Error('Failed to retieve user profile');
//   }

//   const profile: UserProfile = {
//     username: data.username,
//     provider: data.provider,
//     confirmed: data.confirmed,
//     blocked: data.blocked,
//     name: data.name,
//     sex: data.sex,
//     campus: data.campus,
//     faculty: data.faculty,
//     email: data.email,
//   };

//   return profile;
// };

// Temporary implementation
// TODO: Implement this after proper authentication setup
const getUserProfile = async (token: string): Promise<UserProfile> => {
  const payload: Payload = verifyToken(token);
  if (payload === null || typeof payload === 'undefined') {
    throw new Error('Failed to retrieve user profile');
  }

  const user = DUsers.find((user) => user.username === payload.username);
  if (user === null || typeof user === 'undefined') {
    throw new Error('Failed to retrieve user profile');
  }

  const profile: UserProfile = {
    username: user.username,
    name: user.name,
    faculty: user.faculty,
    campus: user.campus,
    sex: user.sex,
    provider: user.provider,
    confirmed: user.confirmed,
    blocked: user.blocked,
    email: user.email,
  };

  return profile;
};

export default {
  getUserAccount,
  getUserProfile,
};
