const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogModel = new Schema({
    uid : {
        type : Schema.Types.ObjectId,
        ref : 'uid'
    },
    image : String,
    location : String,
    caption : String,
    time : {
        type : Date,
        default : Date.now()
    },
    like : [{
        type : Schema.Types.ObjectId,
        ref : 'user'
    }]
});

module.exports = mongoose.model('blog', blogModel)