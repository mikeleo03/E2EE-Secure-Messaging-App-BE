import {User} from '../models/User';
import {db} from '../database';

const userRepository = db.getRepository(User);

const getUsers = async () => {
  try {
    const users = await userRepository.find();
    return users;
  } catch (error) {
    return [];
  }
};

export default {getUsers};
