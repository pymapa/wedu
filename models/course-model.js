var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    tag: {type: String, required: true},
    name: {type: String, required: true}
}, {collection: 'courses'})

module.exports = mongoose.model('Courses', courseSchema);