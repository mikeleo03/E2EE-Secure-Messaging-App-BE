import {Express} from 'express';
import usersController from './controllers/users.controller';
import authController from './controllers/auth.controller';
import topicsController from './controllers/topics.controller';
import requestTopicsController from './controllers/request-topics.controller';
import reportsController from './controllers/reports.controller';
import authMiddleware from './middleware/auth.middleware';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.send(`API server is running (${new Date()})`);
  });

  app.route('/user').get(usersController.getUser);
  app.route('/topics').get(topicsController.getAllTopics);

  //update hot topic status
  app.route('/topics/status/:id').post(topicsController.updateStatusTopics);

  app.route('/auth').post(authController.login);

  app.route('/reports').get(reportsController.getReports);

  app.route('/reports/:id').get(reportsController.getReportById);

  app.route('/reports').post(reportsController.createReport);

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
