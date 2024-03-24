const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentModel = new Schema({
    comment: String,
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    time: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('comment', commentModel)