const usersModel = require('../models/users')

class Users {
  async findOne(query, projection = {}) {
    const user = await usersModel.findOne(query).select(projection)
    return user
  }

  async findAll() {
    return await User.find();
  }

  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async update(query, updateData) {
    return await User.findOneAndUpdate(query, updateData, { new: true });
  }

  async delete(query) {
    return await User.findOneAndDelete(query);
  }

  async find(query) {
    return await User.find(query);
  }

   
}

module.exports = Users