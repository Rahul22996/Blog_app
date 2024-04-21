const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogModel = new Schema({
    uid : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'category'
    },
    image : [String],
    location : String,
    caption : String,
    time : {
        type : Date,
        default : Date.now()
    },
    like : [{
        type : Schema.Types.ObjectId,
        ref : 'user'
    }],
    comment : [{
        type : Schema.Types.ObjectId,
        ref : 'comment'
    }]
});

module.exports = mongoose.model('blog', blogModel)