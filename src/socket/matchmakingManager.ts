import {Socket} from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from './interface';

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

  public check(topicId: string) {
    return this.getQueue(topicId).topicQueue.length >= 2;
  }

  public match(topicId: string) {
    if (!this.check(topicId)) throw new Error('Cannot match');

    const queue = this.getQueue(topicId);

    const user1 = queue.topicQueue.shift();
    const user2 = queue.topicQueue.shift();

    return {user1, user2};
  }
}

const matchmakingManager = new Matchmaking();
export default matchmakingManager;
