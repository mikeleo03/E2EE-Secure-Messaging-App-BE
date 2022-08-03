import {db} from '../database';
import {Chat} from '../models';

const chatRepository = db.getRepository(Chat);

const getUserChatByTopic = async (userId: string, topicId: string) => {
  return await chatRepository.find({
    where: [
      {
        topic_id: parseInt(topicId),
        user_id1: parseInt(userId),
      },
      {
        topic_id: parseInt(topicId),
        user_id2: parseInt(userId),
      },
    ],
  });
};

export default {
  getUserChatByTopic,
};
