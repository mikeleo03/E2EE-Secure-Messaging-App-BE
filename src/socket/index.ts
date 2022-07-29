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

function socket({
  io,
}: {
  io: Server<ClientToServerEvents, ServerToClientEvents, never, SocketData>;
}) {
  console.log('🖥️ Sockets enabled');

  io.use(authMiddleware.authSocketMiddleware);

  io.on('connection', socket => {
    console.log(`🟩 User connected ${socket.id}`);
    socket.data.username = socket.handshake.auth.username;

    socket.on('matchmaking', topicId => {
      socket.join(topicId);

      matchmakingManager.addToQueue(topicId, socket);

      // TODO: Improve matchmaking algorithm
      const isAbleToMatch = matchmakingManager.check(topicId);
      if (isAbleToMatch) {
        const {user1, user2} = matchmakingManager.match(topicId);
        const chatroomId = uuidv4();

        // Handle room manager here
        user1.join(chatroomId);
        user2.join(chatroomId);
        user1.data.roomId = chatroomId;
        user2.data.roomId = chatroomId;

        const newRoom = new Room(chatroomId);
        newRoom.setUser(user1.data.username);
        newRoom.setUser(user2.data.username);

        roomManager.addRoom(newRoom);

        io.to(chatroomId).emit('matched');
      }
    });

    // Emit events
    socket.emit('noArg');
    socket.emit('basicEmit', 1, 'hello');
    socket.emit('withAck', 'str', num => {
      if (typeof num === 'number') {
        console.log('Definitely true');
      }
    });

    // Listen events
    socket.on('hello', () => {
      console.log('Hello from client');
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

    socket.on('disconnect', () => {
      roomManager.deleteRoom(socket.data.roomId);
    });
  });
}

export default socket;
