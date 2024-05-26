import {Chat} from '../models';
import chatServices from '../services/chat.services';

class Room {
  roomId: string;
  topicId: string;
  users: string[];
  usersName: object;
  checkReveal: object;
  isRevealed: boolean;
  chat: Chat;

  constructor(roomId: string, topicId: string) {
    this.roomId = roomId;
    this.topicId = topicId;
    this.users = [];
    this.usersName = {};
    this.checkReveal = {};
    this.isRevealed = false;
    this.chat = null;
  }

  setUser(user: string, name: string) {
    this.users.push(user);
    this.usersName[user] = name;
    this.checkReveal[user] = false;
  }

  async setChat() {
    if (this.users.length < 2) throw Error('Add user first!');

    try {
      const result = await chatServices.createChat({
        chat_id: this.roomId,
        topic_id: this.topicId,
        user_id1: this.users[0],
        user_id2: this.users[1],
      });

      this.chat = result;
    } catch (error) {
      console.error(error);
    }
  }

  async updateEndChat() {
    try {
      const result = await chatServices.updateEndChat({
        chat_id: this.roomId,
      });

      // this.chat = result[0];
    } catch (error) {
      console.error(error);
    }
  }

  async createMessage(sender_id: string, message: string, isSigned: boolean, signature: { e: string, y: string }, scpubkey: string) {
    if (!this.users.includes(sender_id))
      throw Error(`User ${sender_id} not found in chat room`);

    return await chatServices.createMessage({
      chat_id: this.roomId,
      sender_id,
      message,
      isSigned,
      signature,
      scpubkey,
    });
  }

  requestReveal(user: string) {
    this.checkReveal[user] = true;
  }

  canRevealName() {
    let shouldReveal = false;
    if (
      Object.keys(this.checkReveal).length === 2 &&
      Object.values(this.checkReveal).every(val => val === true) &&
      !this.isRevealed
    ) {
      shouldReveal = true;
      this.isRevealed = true;
    }
    return shouldReveal;
  }

  getUsersName(user: string) {
    return this.usersName[user];
  }
}

export default Room;
