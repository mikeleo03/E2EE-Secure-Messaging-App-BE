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

  app
    .route('/user')
    .get(authMiddleware.authMiddleware, usersController.getUserProfile);

  app.route('/auth').post(authController.login);

  app
    .route('/topics')
    .get(authMiddleware.authMiddleware, topicsController.getTopics);

  app
    .route('/reports')
    .get(authMiddleware.authAdminMiddleware, reportsController.getReports);

  app
    .route('/reports/:id')
    .get(authMiddleware.authAdminMiddleware, reportsController.getReportById);

  app
    .route('/reports')
    .post(authMiddleware.authMiddleware, reportsController.createReport);

  app
    .route('/request-topics')
    .get(
      authMiddleware.authAdminMiddleware,
      requestTopicsController.getRequestTopics
    );

  app
    .route('/request-topics')
    .post(
      authMiddleware.authMiddleware,
      requestTopicsController.createRequestTopics
    );

  app
    .route('/request-topics/:id')
    .get(
      authMiddleware.authAdminMiddleware,
      requestTopicsController.getRequestTopic
    );

  app
    .route('/request-topics/:id')
    .put(
      authMiddleware.authAdminMiddleware,
      requestTopicsController.updateStatusRequestTopics
    );
};

export default routes;
