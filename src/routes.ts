import {Express} from 'express';
import authController from './controllers/auth.controller';
import bannedUserController from './controllers/banned-user.controller';
import historyController from './controllers/history.controller';
import quotaController from './controllers/quota.controller';
import reportsController from './controllers/reports.controller';
import requestTopicsController from './controllers/request-topics.controller';
import sessionController from './controllers/session.controller';
import topicsController from './controllers/topics.controller';
import usersController from './controllers/users.controller';
import authMiddleware from './middleware/auth.middleware';
import cryptoController from './controllers/crypto.controller';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.send(`API server is running (${new Date()})`);
  });

  app
    .route('/user')
    .get(authMiddleware.authMiddleware, usersController.getUserProfile);

  app
    .route('/auth')
    .post(authMiddleware.authBannedUserMiddleware, authController.login);

  app
    .route('/topics')
    .get(authMiddleware.authMiddleware, topicsController.getTopics);

  app
    .route('/reports/seen')
    .get(authMiddleware.authAdminMiddleware, reportsController.getSeenReports);

  app
    .route('/reports/unseen')
    .get(
      authMiddleware.authAdminMiddleware,
      reportsController.getUnseenReports
    );

  app
    .route('/reports/mark-seen')
    .post(authMiddleware.authAdminMiddleware, reportsController.markReportSeen);

  app
    .route('/reports/mark-unseen')
    .post(
      authMiddleware.authAdminMiddleware,
      reportsController.markReportUnseen
    );

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

  app
    .route('/history/:user_id')
    .get(authMiddleware.authMiddleware, historyController.getAllHistoryChat);

  app
    .route('/history/:user_id/:chat_id')
    .get(authMiddleware.authMiddleware, historyController.getOneHistoryChat);

  app
    .route('/ban-user')
    .post(authMiddleware.authAdminMiddleware, bannedUserController.banUser);

  app
    .route('/ban-user')
    .delete(authMiddleware.authAdminMiddleware, bannedUserController.unbanUser);

  app
    .route('/ban-user')
    .get(
      authMiddleware.authAdminMiddleware,
      bannedUserController.getBannedUsers
    );

  app.route('/quota/:username').get(quotaController.getUserQuota);

  app.route('/quota/:username').post(quotaController.updateUserQuota);

  app
    .route('/socket-connect')
    .post(
      authMiddleware.authBannedUserMiddleware,
      authMiddleware.authMiddleware,
      sessionController.getSession
    );

  app
    .route('/test')
    .post(
      cryptoController.encryptCryptoNight
    );
};

export default routes;
