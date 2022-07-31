class UsersManager {
  numUsers: number = 0;

  addUser() {
    this.numUsers++;
  }

  deleteUser() {
    this.numUsers--;
  }

  getNumUsers() {
    return this.numUsers;
  }
}

const userManager = new UsersManager();
export default userManager;
