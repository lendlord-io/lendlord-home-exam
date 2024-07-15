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

/**Get user by email */

exports.getUserByEmail = async ctx => {
  const { email } = ctx.params;
  try {
    console.log('Finding user by email:', email);
    const user = await users.findUser({ email: email });

    if (!user) {
      ctx.status = 404;
      ctx.message = 'User not found';
      return;
    }

    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

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
  try {
    const updatedUser = await users.updateUser({ _id: new ObjectId(id) }, ctx.request.body);
    if (!updatedUser) {
      ctx.status = 404;
      ctx.message = 'User not found';
      return;
    }
    ctx.status = 200;
    ctx.body = updatedUser;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

/*--------------------------------------------------------------------------------------------*/

/**Delete user */

exports.deleteUser = async (ctx) => {
  const { id } = ctx.params;
  try {
    const deletedUser = await users.deleteUser({ _id: new ObjectId(id) });
    if (!deletedUser) {
      ctx.status = 404;
      ctx.message = 'User not found';
      return;
    }
    ctx.status = 200;
    ctx.body = { message: 'User deleted successfully' };
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
    const manager = await users.findUser({ _id: new ObjectId(id), role: 'manager' });
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