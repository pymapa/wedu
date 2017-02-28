var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    message: String,
    course: {type: String, required: true},
    lecture: {type: String, required: false},
    user: {type: String},
    created: {type: Date, default: Date.now},
    upvotes: {type: Number, default: 0},
    type: {type: Number, required: true, default: 1 },
    solved: {type: Boolean, default: false},
    thread: {
        messages: []
    }
}, {collection: 'messages'})

module.exports = mongoose.model('Message', messageSchema);