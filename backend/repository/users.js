const usersModel = require('../models/users')

class Users {
  async findOne(query, projection = {}) {
    const user = await usersModel.findOne(query).select(projection)
    return user
  }

  async findAll() {
    try {
      return await usersModel.find();
    } catch (err) {
      console.error('Error finding all users:', err);
      throw err;
    }
  }

  async create(userData) {
    try {
      const user = new usersModel(userData);
      const savedUser = await user.save();
      return savedUser;
    } catch (err) {
      // Log the error for debugging
      console.error('Error creating user:', err);

      // Handle duplicate key error for email field
      if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        throw new Error('User with this email already exists.');
      }

      throw err; // Rethrow the error to be handled by the route handler
    }
  }

  async update(query, updateData) {
    try {
      return await usersModel.findOneAndUpdate(query, updateData, { new: true });
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  }

  async delete(query) {
    try {
      return await usersModel.findOneAndDelete(query);
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  }

  async find(query) {
    try {
      return await usersModel.find(query);
    } catch (err) {
      console.error('Error finding users:', err);
      throw err;
    }
  }
   
}

module.exports = Users