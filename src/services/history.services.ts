import {db} from '../database';
import {Chat, Message, Topic} from '../models';

const chatRepository = db.getRepository(Chat);
const messageRepository = db.getRepository(Message);
const topicRepository = db.getRepository(Topic);

const getOneHistoryChat = async (params: {
  user_id: string;
  chat_id: string;
}) => {
  // useless user_id
  try {
    const messages = await messageRepository.find({
      where: {
        chat_id: params.chat_id,
      },
      order: {
        timestamp: 'ASC',
      },
    });

    return messages;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAllHistoryChat = async (params: {user_id: string}) => {
  try {
    const chats = await db.query(`
      SELECT C.chat_id, C.topic_id, topic_name, message, timestamp
      FROM chat AS C
      INNER JOIN topic AS T ON C.topic_id = T.topic_id
      INNER JOIN (
          SELECT chat_id, message, timestamp,
          ROW_NUMBER() OVER (partition by chat_id order by timestamp desc) AS n
          FROM message
      ) AS X ON C.chat_id = X.chat_id
      WHERE n = 1 AND end_datetime IS NOT NULL AND (user_id1 = '${params.user_id}' OR user_id2 = '${params.user_id}')
      ORDER BY timestamp DESC
    `);

    return chats;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default {
  getOneHistoryChat,
  getAllHistoryChat,
};
