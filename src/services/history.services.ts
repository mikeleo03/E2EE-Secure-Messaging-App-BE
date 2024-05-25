import { decryptMessage } from '../algorithms/ECC/ECCUtils';
import { ECPoint } from '../algorithms/ECC/EllipticCurve';
import {db} from '../database';
import {Chat, Message, Topic} from '../models';
import sharedKeyServices from './sharedKey.services';

const messageRepository = db.getRepository(Message);

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

    for (let message of messages) {
      const sharedKey = await sharedKeyServices.getSharedKeyByUser(message.sender_id);

      if (sharedKey) {
        const {sharedX, sharedY} = sharedKey;
        const sharedSecret = new ECPoint(BigInt(sharedX as string), BigInt(sharedY as string));

        message.message = decryptMessage(message.message, sharedSecret);
      }
    }

    return messages;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAllHistoryChat = async (params: {user_id: string}) => {
  try {
    const chats = await db.query(`
      SELECT C.chat_id, C.topic_id, topic_name, sender_id, message, timestamp
      FROM chat AS C
      INNER JOIN topic AS T ON C.topic_id = T.topic_id
      INNER JOIN (
          SELECT chat_id, sender_id, message, timestamp,
          ROW_NUMBER() OVER (partition by chat_id order by timestamp desc) AS n
          FROM message
      ) AS X ON C.chat_id = X.chat_id
      WHERE n = 1 AND end_datetime IS NOT NULL AND (user_id1 = '${params.user_id}' OR user_id2 = '${params.user_id}')
      ORDER BY timestamp DESC
    `);

    console.log(chats);

    for (let chat of chats) {
      const sharedKey = await sharedKeyServices.getSharedKeyByUser(chat.sender_id);

      if (sharedKey) {
        const {sharedX, sharedY} = sharedKey;
        const sharedSecret = new ECPoint(BigInt(sharedX as string), BigInt(sharedY as string));

        chat.message = decryptMessage(chat.message, sharedSecret);
      }
    }

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
