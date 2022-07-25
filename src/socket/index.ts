import {Server} from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from './interface';
import matchmakingManager from './matchmakingManager';
import {v4 as uuidv4} from 'uuid';

function socket({
  io,
}: {
  io: Server<ClientToServerEvents, ServerToClientEvents, never, SocketData>;
}) {
  console.log('🖥️ Sockets enabled');

  io.on('connection', socket => {
    console.log(`🟩 User connected ${socket.id}`);

    socket.on('matchmaking', topicId => {
      socket.join(topicId);

      matchmakingManager.addToQueue(topicId, socket);

      // TODO: Improve matchmaking algorithm
      const isAbleToMatch = matchmakingManager.check(topicId);
      if (isAbleToMatch) {
        const {user1, user2} = matchmakingManager.match(topicId);
        const chatroomId = uuidv4();

        // TODO: Handle room manager here
        user1.join(chatroomId);
        user2.join(chatroomId);

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
  });
}

export default socket;
