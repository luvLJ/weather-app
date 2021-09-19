const mongoose = require('mongoose')
const bc = require('bcrypt')

mongoose.connect('mongodb://localhost:27017/users')

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  password: {
    type: String,
    set(val) {
      return bc.hashSync(val, 10)
    }
  },
  email: {
    type: String,
    default: ''
  },
  cityList: {
    type: Array,
    default: []
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }
