const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose?.connection?.on('connected', () => {
  log.info('Mongoose connected')
})

mongoose?.connection?.on('disconnected', () => {
  log.info('Mongoose disconnected')
})

mongoose?.connection?.on('error', err => {
  log.error('Mongoose error', err)
})

module.exports.init = async () => {
  try{
  const connString = process.env.MONGO_CONN_STRING ? process.env.MONGO_CONN_STRING : config.database
  await mongoose.connect(connString,{ useNewUrlParser: true, useUnifiedTopology: true })

  log.info('connected to database')
  }catch (err){
    log.error('Faild connect to DB',err)
    throw err
  }
}
