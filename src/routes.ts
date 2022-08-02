import { Express } from 'express';
import authController from './controllers/auth.controller';
import historyController from './controllers/history.controller';
import reportsController from './controllers/reports.controller';
import requestTopicsController from './controllers/request-topics.controller';
import topicsController from './controllers/topics.controller';
import usersController from './controllers/users.controller';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.send(`API server is running (${new Date()})`);
  });

  app.route('/user').get(usersController.getUser);

  app.route('/auth').post(authController.login);

  app.route('/topics').get(topicsController.getTopics);

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
  
  app.route('/history/:user_id').get(historyController.getAllHistoryChat);
  
  app.route('/history/:user_id/:chat_id').get(historyController.getOneHistoryChat);
};

export default routes;
