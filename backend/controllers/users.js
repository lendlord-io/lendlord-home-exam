const { ObjectId } = require('mongodb')
const Users = require('../lib/users')
const users = new Users()


/**Get all users */
exports.getAllUsers = async (ctx) => {
  try {
    const allUsers = await users.findAllUsers();
    ctx.status = 200;
    ctx.body = allUsers;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

/*--------------------------------------------------------------------------------------------*/

/**
 * Gets user by id
 */
exports.getUserById = async ctx => {
  const { id } = ctx.params
  try {
    console.log(1)
    const user = await users.findUser({ _id: new ObjectId(id) })
    
    ctx.status = 200
    ctx.body = user  
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}
/*--------------------------------------------------------------------------------------------*/

/**Create user */
exports.createUser = async (ctx) => {
  try {
    const newUser = await users.createUser(ctx.request.body);
    ctx.status = 201;
    ctx.body = newUser;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

/*--------------------------------------------------------------------------------------------*/

/**Update user */
exports.updateUser = async (ctx) => {
  const { id } = ctx.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid User ID' };
    return;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, ctx.request.body, { new: true });
    if (!updatedUser) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
    } else {
      ctx.status = 200;
      ctx.body = updatedUser;
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
}

/*--------------------------------------------------------------------------------------------*/

/**Delete user */
exports.deleteUser = async (ctx) => {
  const { id } = ctx.params;
  console.log(`Received delete request for user id: ${id}`); /
  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid User ID' };
    return;
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
    } else {
      ctx.status = 200;
      ctx.body = { message: 'User deleted successfully' };
    }
  } catch (err) {
    console.error('Error deleting user:', err); 
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete user' };
  }
};

/*--------------------------------------------------------------------------------------------*/

/**Update user by email*/

exports.updateUserByEmail = async (ctx) => {
  const { email } = ctx.params;
  try {
    const updatedUser = await users.updateUser({ email }, ctx.request.body);
    if (!updatedUser) {
      ctx.status = 404;
      ctx.message = 'User not found';
      return;
    }

    // If manager email is provided, fetch the manager's ID
    if (ctx.request.body.manager) {
      const manager = await users.findUser({ email: ctx.request.body.manager });
      if (manager) {
        updatedUser.manager = manager._id; // Update the manager field with the ID
        await updatedUser.save(); // Save the updated user
      } else {
        ctx.status = 400; // Bad Request
        ctx.body = { error: 'Invalid manager email' };
        return;
      }
    }

    ctx.status = 200;
    ctx.body = updatedUser;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};


/*--------------------------------------------------------------------------------------------*/

/**Get manager and his employees */
exports.getManagerAndEmployees = async (ctx) => {
  const { id } = ctx.params;
  try {
    const manager = await users.findUser({ _id: new mongoose.Types.ObjectId(id), role: 'manager' });
    if (!manager) {
      ctx.status = 404;
      ctx.message = 'Manager not found';
      return;
    }
    const employees = await users.findUsers({ manager: id });
    ctx.status = 200;
    ctx.body = { manager, employees };
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

async function initialize() {
  await users.initialize();
}


initialize()