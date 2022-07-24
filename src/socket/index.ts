import {Server} from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from './interface';
import roomManager from './roomManager';
import Room from './revealnameManager';

function socket({
  io,
}: {
  io: Server<ClientToServerEvents, ServerToClientEvents, never, SocketData>;
}) {
  console.log('🖥️ Sockets enabled');

  io.on('connection', socket => {
    console.log(`🟩 User connected ${socket.id}`);

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

    socket.on('dummyMatch', roomId => {
      socket.join(roomId);
      socket.data.roomId = roomId;
      const room = roomManager.getRoom(roomId);
      if (!room) {
        const newRoom = new Room(roomId);
        newRoom.setUser(socket.id);
        roomManager.addRoom(newRoom);
      } else {
        room.setUser(socket.id);
      }
      console.log(roomManager);
    });

    socket.on('revealName', () => {
      const roomId = socket.data.roomId;
      const room = roomManager.getRoom(roomId);
      room?.requestReveal(socket.id);
      if (room?.canRevealName()) {
        const user1 = room.users[0];
        const user2 = room.users[1];
        io.to(roomId).emit('revealName', {
          user1: `Dummy Name 1 ${user1}`,
          user2: `Dummy Name 2 ${user2}`,
        });
      }
      console.log(roomManager);
    });

    socket.on('disconnect', () => {
      roomManager.deleteRoom(socket.data.roomId);
      console.log(roomManager);
    });
  });
}

export default socket;
