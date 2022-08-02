import {RequestHandler} from 'express';
import quotaServices from '../services/quota.services';

const getUserQuota: RequestHandler = async (req, res) => {
  const username = req.params.username;
  const userQuota = await quotaServices.getUserQuota({username: username});
  res.json({user_quota: userQuota});
};

const updateUserQuota: RequestHandler = async (req, res) => {
  const username = req.params.username;
  const updatedStatus = await quotaServices.updateUserQuota({
    username: username,
  });
  res.status(updatedStatus).send();
};

export default {
  getUserQuota,
  updateUserQuota,
};
