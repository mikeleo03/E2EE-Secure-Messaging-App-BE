import {Session} from '../models';
import {db} from '../database';

const sessionRepository = db.getRepository(Session);

const checkSession = async (username: string) => {
  try {
    const session = await sessionRepository.findOne({
      where: {
        user_id: username,
      },
    });

    if (!session) {
      const newSession = await sessionRepository.save({
        user_id: username,
        isLoggedIn: false,
      });

      return newSession.isLoggedIn;
    }

    return session.isLoggedIn;
  } catch (error) {
    console.error('Session Error:', error);
    return true;
  }
};

const setSession = async (username: string, value: boolean) => {
  try {
    await sessionRepository.save({
      user_id: username,
      isLoggedIn: value,
    });
  } catch (error) {
    console.error(error);
  }
};

export default {checkSession, setSession};
