import {Express} from 'express';
import usersController from './controllers/users.controller';
import topicsController from './controllers/topics.controller';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.send(`API server is running (${new Date()})`);
  });

  app.route('/user').get(usersController.getUser);
  app.route('/topic').get(topicsController.getAllTopics);
  app.route('/topic/status').post(topicsController.updateStatusTopics);
};

export default routes;
