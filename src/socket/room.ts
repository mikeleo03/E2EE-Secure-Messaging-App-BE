class Room {
  roomId: string;
  users: string[];
  checkReveal: object;
  isRevealed: boolean;

  constructor(roomId: string) {
    this.roomId = roomId;
    this.isRevealed = false;
    this.users = [];
    this.checkReveal = {};
  }

  setUser(user: string) {
    this.users.push(user);
    this.checkReveal[user] = false;
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
}

export default Room;
