var Cource = require('./../models/course-model');

module.exports = function() {

    getCources = function(callback) {
        Course.find({})
        .then(function(data) {
            callback(false, data);
        }, function(err) {
            callback(true, err);
        })
    }
}