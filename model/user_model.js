const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
  name : String,
  username : {
    type : String,
    unique : true
  },
  email : String,
  password : String,
  image : String
});

module.exports = mongoose.model('user', userModel)