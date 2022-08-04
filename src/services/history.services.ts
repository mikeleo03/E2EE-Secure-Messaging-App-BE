import {LessThan} from 'typeorm';
import {db} from '../database';
import {Chat, Message} from '../models';

const chatRepository = db.getRepository(Chat);
const messageRepository = db.getRepository(Message);

const getOneHistoryChat = async (params: {
  user_id: string;
  chat_id: number;
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
    // find chat that end_datetime is earlier than current time
    const dateNow = new Date();
    const chats = await chatRepository.find({
      where: [
        {
          user_id1: params.user_id,
          end_datetime: LessThan(dateNow),
        },
        {
          user_id2: params.user_id,
          end_datetime: LessThan(dateNow),
        },
      ],
    });

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
