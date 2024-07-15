const UsersRepo = require('../repository/users')


class Users {
  async initialize() {
    this.repo = new UsersRepo()
  }

  async findUser(query, projection = {}) {
    const user = await this.repo.findOne(query)
    return user
  }

  async findAllUsers() {
    return await this.repo.findAll();
  }

  async createUser(userData) {
    return await this.repo.create(userData);
  }

  async updateUser(query, updateData) {
    return await this.repo.update(query, updateData);
  }

  async deleteUser(query) {
    return await this.repo.delete(query);
  }

  async findUsers(query) {
    return await this.repo.find(query);
  }

}


module.exports = Users