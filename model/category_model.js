const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categoryModel = new Schema({
    name : String,
    image : String
});

module.exports = mongoose.model('category', categoryModel);