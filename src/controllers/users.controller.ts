import {RequestHandler} from 'express';

const getUser: RequestHandler = (_, res) => {
  res.json({
    name: 'John Doe',
    email: 'johndoe@email,con',
  });
};

export default {getUser};
