import {Express} from 'express';
import usersController from './controllers/users.controller';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.send(`API server is running (${new Date()})`);
  });

  app.route('/user').get(usersController.getUser);
};

export default routes;
