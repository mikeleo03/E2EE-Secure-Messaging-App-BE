import {Express} from 'express';
import usersController from './controllers/users.controller';
import topicsController from './controllers/topics.controller';
import requestTopicsController from './controllers/request-topics.controller';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.send(`API server is running (${new Date()})`);
  });

  app.route('/user').get(usersController.getUser);

  app.route('/topics').get(topicsController.getTopics);

  // validate admin auth middleware
  app.route('/request-topics').get(requestTopicsController.getRequestTopics);
  // validate user auth middleware
  app
    .route('/request-topics')
    .post(requestTopicsController.createRequestTopics);

  // validate admin auth middleware
  app.route('/request-topics/:id').get(requestTopicsController.getRequestTopic);
  // validate admin auth middleware
  app
    .route('/request-topics/:id')
    .put(requestTopicsController.updateStatusRequestTopics);
};

export default routes;
