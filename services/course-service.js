var Course = require('./../models/course-model');

module.exports = {

    getCourses: function(callback) {
        Course.find({})
        .then(function(data) {
            callback(false, data);
        }, function(err) {
            callback(true, err);
        })
    },

    getCourseByTag: function(tag, callback) {
        Course.find({"tag": tag})
        .then(function(data) {
            callback(false, data)
        }, function(err) {
            callback(true, err);
        })
    }
}