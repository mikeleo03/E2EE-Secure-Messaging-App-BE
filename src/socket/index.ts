import {Server} from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from './interface';
import authMiddleware from '../middleware/auth.middleware';
import matchmakingManager from './matchmakingManager';
import {v4 as uuidv4} from 'uuid';
import roomManager from './roomManager';
import Room from './room';
import usersManager from './usersManager';

function socket({
  io,
}: {
  io: Server<ClientToServerEvents, ServerToClientEvents, never, SocketData>;
}) {
  console.log('🖥️ Sockets enabled');

  io.use(authMiddleware.authSocketMiddleware);

  io.on('connection', socket => {
    usersManager.addUser();
    console.log(`🟩 User connected ${socket.data.username} (${socket.id})`);

    socket.on('matchmaking', async topicId => {
      socket.join(topicId);

      matchmakingManager.addToQueue(topicId, socket);

      const isAbleToMatch = matchmakingManager.check(topicId);
      if (isAbleToMatch) {
        const result = await matchmakingManager.match(
          topicId,
          socket.data.username
        );

        if (result !== false) {
          const user1 = result.currentUser;
          const user2 = result.matchedUser;
          const chatroomId = uuidv4();

          user1.join(chatroomId);
          user2.join(chatroomId);
          user1.data.roomId = chatroomId;
          user2.data.roomId = chatroomId;

          const newRoom = new Room(chatroomId, topicId);
          newRoom.setUser(user1.data.username, user1.data.name);
          newRoom.setUser(user2.data.username, user2.data.name);
          await newRoom.setChat();

          roomManager.addRoom(newRoom);

          io.to(chatroomId).emit('matched', newRoom.roomId);
        }
      }
    });

    socket.on('matchNotFound', topicId => {
      matchmakingManager.removeFromQueue(topicId, socket);
    });

    socket.on('revealName', () => {
      const roomId = socket.data.roomId;
      const room = roomManager.getRoom(roomId);
      room?.requestReveal(socket.data.username);
      if (room?.canRevealName()) {
        const username1 = room.users[0];
        const username2 = room.users[1];
        io.to(roomId).emit('revealName', {
          username1: username1,
          name1: room.getUsersName(username1),
          username2: username2,
          name2: room.getUsersName(username2),
        });
      }
    });

    socket.on('message', async ({content}) => {
      try {
        const room = roomManager.getRoom(socket.data.roomId);
        const message = await room.createMessage(socket.data.username, content);

        io.to(socket.data.roomId).emit('message', {
          content: message.message,
          from: socket.id,
        });
      } catch (e) {
        let errorMessage: string;

        if (typeof e === 'string') {
          errorMessage = e;
        } else if (e instanceof Error) {
          errorMessage = `${e.name} - ${e.message}`;
        } else {
          errorMessage = 'Unknown error';
        }

        io.to(socket.id).emit('messageFail', {
          error: errorMessage,
        });
      }
    });

    socket.on('endChat', () => {
      if (socket.data.roomId) {
        io.to(socket.data.roomId).emit(
          'endChat',
          'Your partner has ended the chat'
        );
      }
    });

    socket.on('disconnect', () => {
      usersManager.deleteUser();
      roomManager.deleteRoom(socket.data.roomId);
      io.to(socket.data.roomId).emit(
        'endChat',
        'Your partner has disconnected'
      );
    });
  });
}

export default socket;
