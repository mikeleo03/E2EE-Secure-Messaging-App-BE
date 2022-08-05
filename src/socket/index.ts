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
          const {user1, user2} = result;
          const chatroomId = uuidv4();

          user1.join(chatroomId);
          user2.join(chatroomId);
          user1.data.roomId = chatroomId;
          user2.data.roomId = chatroomId;

          const newRoom = new Room(chatroomId, topicId);
          newRoom.setUser(user1.data.username);
          newRoom.setUser(user2.data.username);
          await newRoom.setChat();

          roomManager.addRoom(newRoom);

          io.to(chatroomId).emit('matched');
        }
      }
    });

    socket.on('matchNotFound', topicId => {
      matchmakingManager.removeFromQueue(topicId, socket);
    });

    socket.on('revealName', () => {
      console.log(`${socket.data.username} ask reveal`);
      const roomId = socket.data.roomId;
      const room = roomManager.getRoom(roomId);
      console.log(room);
      room?.requestReveal(socket.data.username);
      if (room?.canRevealName()) {
        const user1 = room.users[0];
        const user2 = room.users[1];
        io.to(roomId).emit('revealName', {
          user1: `Dummy Name 1 ${user1}`,
          user2: `Dummy Name 2 ${user2}`,
        });
      }
    });

    socket.on('message', async ({content}) => {
      socket.to(socket.data.roomId).emit('message', {
        content,
        from: socket.id,
      });

      const room = roomManager.getRoom(socket.data.roomId);
      await room.createMessage(socket.data.username, content);
    });

    socket.on('disconnect', () => {
      usersManager.deleteUser();
      roomManager.deleteRoom(socket.data.roomId);
    });
  });
}

export default socket;
