import {Socket} from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from './interface';
import chatServices from '../services/chat.services';

type UserSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  never,
  SocketData
>;

interface Queue {
  topicId: string;
  topicQueue: UserSocket[];
}

class Matchmaking {
  queueList: Queue[];

  constructor() {
    this.queueList = [];
  }

  private getQueue(topicId: string) {
    return this.queueList.filter(queue => queue.topicId === topicId)[0];
  }

  private getQueueIdx(topicId: string) {
    return this.queueList.findIndex(queue => queue.topicId === topicId);
  }

  public addToQueue(topicId: string, user: UserSocket) {
    let isTopicInList = false;
    this.queueList = this.queueList.map(queue => {
      if (queue.topicId === topicId) {
        isTopicInList = true;
        return {topicId, topicQueue: [...queue.topicQueue, user]};
      }
      return queue;
    });

    if (!isTopicInList) this.queueList.push({topicId, topicQueue: [user]});
  }

  public removeFromQueue(topicId: string, user: UserSocket) {
    const queueIdx = this.getQueueIdx(topicId);

    this.queueList[queueIdx].topicQueue = this.queueList[
      queueIdx
    ].topicQueue.filter(queuedUser => {
      return queuedUser.data.username !== user.data.username;
    });
  }

  public check(topicId: string) {
    return this.getQueue(topicId).topicQueue.length >= 2;
  }

  public async match(topicId: string, currentUserId: string) {
    if (!this.check(topicId)) throw new Error('Cannot match');

    const chats = await chatServices.getUserChatByTopic(currentUserId, topicId);
    const queue = this.getQueue(topicId);

    const user1Index = queue.topicQueue.findIndex(
      queue => queue.data.username === currentUserId
    );

    const user2Index = queue.topicQueue.findIndex(queue => {
      let hasChat = false;
      let i = 0;

      if (queue.data.username === currentUserId) {
        return false;
      }

      while (!hasChat && i < chats.length) {
        const chat = chats[i];

        if (
          (chat.user_id1.toString() === currentUserId &&
            chat.user_id2.toString() === queue.data.username) ||
          (chat.user_id2.toString() === currentUserId &&
            chat.user_id1.toString() === queue.data.username)
        ) {
          hasChat = true;
          break;
        } else {
          i++;
        }
      }

      return !hasChat;
    });

    if (user2Index === -1) {
      return false;
    }

    const user1 = queue.topicQueue.splice(user1Index, 1)[0];
    const user2 = queue.topicQueue.splice(user2Index, 1)[0];

    return {user1, user2};
  }
}

const matchmakingManager = new Matchmaking();
export default matchmakingManager;
