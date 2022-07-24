import Room from './revealnameManager';

class RoomManager {
  rooms: Room[] = [];

  addRoom(room: Room) {
    this.rooms.push(room);
  }

  getRoom(roomId: string) {
    for (let i = 0; i < this.rooms?.length; i++) {
      if (this.rooms[i].roomId === roomId) {
        return this.rooms[i];
      }
    }
  }

  deleteRoom(roomId: string) {
    this.rooms = this.rooms.filter(val => val.roomId !== roomId);
  }
}

const roomManager = new RoomManager();
export default roomManager;
