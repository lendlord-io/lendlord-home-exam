const Router = require('koa-router')
const router = new Router()

const ctrl =  require('../controllers/users')

router.get('/users', ctrl.getAllUsers); 

router.post('/user',ctrl.createUser)

router.put('/user/email/:email', ctrl.updateUserByEmail); 

router.delete('/user/:id',ctrl.deleteUser)

router.get('/manager/:id/employees', ctrl.getManagerAndEmployees);

router.get('/user/:id', ctrl.getUserById);  

router.put('/user/:id',ctrl.updateUser)

router.allowedMethods()

module.exports = router
