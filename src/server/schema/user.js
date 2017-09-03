import mongoose from '../db.js'

let UserSchema = new mongoose.Schema({
    userName: {type: String},
    userAddr: {type: String},
    userAge: {type: Number},
    loginDate: {type: Date}
})

export default mongoose.model('User', UserSchema)
