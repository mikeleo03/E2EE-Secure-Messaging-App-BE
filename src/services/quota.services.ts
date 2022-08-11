import {db} from '../database';
import {Quota} from '../models';

const quotaRepository = db.getRepository(Quota);

const getUserQuota = async (params: {username: string}) => {
  try {
    const userQuota = await quotaRepository.findOne({
      where: {
        username: params.username,
      },
    });
    if (!userQuota) {
      const newUserQuota = await quotaRepository.save({
        username: params.username,
        user_quota: 0,
        quota_at: new Date(),
      });
      return newUserQuota.user_quota;
    }
    const currentDate = new Date().toDateString();
    if (userQuota?.quota_at.toDateString() !== currentDate) {
      const updatedUserQuota = await quotaRepository.save({
        ...userQuota,
        user_quota: 0,
        quota_at: new Date(),
      });
      return updatedUserQuota.user_quota;
    }
    return userQuota.user_quota;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const updateUserQuota = async (params: {username: string}) => {
  try {
    const userQuota = await quotaRepository.findOne({
      where: {
        username: params.username,
      },
    });
    if (!userQuota) {
      return 400;
    }
    await quotaRepository.save({
      ...userQuota,
      user_quota: userQuota.user_quota + 1,
      quota_at: new Date(),
    });
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export default {
  getUserQuota,
  updateUserQuota,
};
