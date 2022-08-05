import {db} from '../database';
import {Chat, Message} from '../models';

const chatRepository = db.getRepository(Chat);
const messageRepository = db.getRepository(Message);

const getUserChatByTopic = async (userId: string, topicId: string) => {
  return await chatRepository.find({
    where: [
      {
        topic_id: parseInt(topicId),
        user_id1: userId,
      },
      {
        topic_id: parseInt(topicId),
        user_id2: userId,
      },
    ],
  });
};

const createMessage = async (params: {
  chat_id: string;
  sender_id: string;
  message: string;
}) => {
  try {
    const newMessage = await messageRepository.save({
      chat_id: parseInt(params.chat_id),
      sender_id: params.sender_id,
      message: params.message,
      timestamp: new Date(),
    });

    return newMessage;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createChat = async (params: {
  chat_id: string;
  topic_id: string;
  user_id1: string;
  user_id2: string;
}) => {
  try {
    const newChat = await chatRepository.save({
      chat_id: params.chat_id,
      topic_id: parseInt(params.topic_id),
      user_id1: params.user_id1,
      user_id2: params.user_id2,
      start_datetime: new Date(),
      end_datetime: null,
    });

    return newChat;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const updateEndChat = async (params: {chat_id: string}) => {
  try {
    const chat = await chatRepository.findOne({
      where: {
        chat_id: params.chat_id,
      },
    });

    const updatedChat = await chatRepository.save({
      chat_id: params.chat_id,
      topic_id: chat.topic_id,
      user_id1: chat.user_id1,
      user_id2: chat.user_id2,
      start_datetime: chat.start_datetime,
      end_datetime: new Date(),
    });

    return updatedChat;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default {
  getUserChatByTopic,
  createMessage,
  createChat,
  updateEndChat,
};
