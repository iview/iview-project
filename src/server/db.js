import mongoose from 'mongoose'
import bluebird from 'bluebird'

mongoose.Promise = bluebird

const DB_URL = 'mongodb://gcvin:gcvin@ds133261.mlab.com:33261/mongo'

mongoose.connect(DB_URL, {useMongoClient: true})

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL)
})

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected')
})

export default mongoose
