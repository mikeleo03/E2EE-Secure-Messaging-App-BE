import {RequestHandler} from 'express';
import usersServices from '../services/users.services';

const getUser: RequestHandler = async (_, res) => {
  const user = await usersServices.getUsers();

  res.json({
    name: 'John Doe',
    email: 'johndoe@email,con',
  });
};

export default {getUser};
