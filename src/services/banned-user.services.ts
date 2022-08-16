import {BannedUser} from '../models';
import {db} from '../database';

const bannedUserRepository = db.getRepository(BannedUser);

const checkBannedUser = async (params: {identifier: string}) => {
  try {
    const bannedUser = await bannedUserRepository.findOne({
      where: {
        identifier: params.identifier,
      },
    });

    return bannedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addBannedUser = async (params: {identifier: string}) => {
  try {
    const newBannedUser = await bannedUserRepository.save({
      identifier: params.identifier,
    });

    return newBannedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllBannedUser = async () => {
  const bannedUsers = await bannedUserRepository.find();
  return bannedUsers;
};

export default {
  checkBannedUser,
  addBannedUser,
  getAllBannedUser,
};
