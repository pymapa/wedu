var Course = require('./../models/course-model');

module.exports = {

    getCourses: function (callback) {
        Course.find({})
            .then(function (data) {
                callback(false, data);
            }, function (err) {
                callback(true, err);
            })
    },

    getCourseByTagOrId: function (tag, _id, callback) {
        if (tag != null) {
            Course.find({ "tag": tag })
                .then(function (data) {
                    callback(false, data)
                }, function (err) {
                    callback(true, err);
                })
        } else {
            Course.find({ "_id": _id })
                .then(function (data) {
                    callback(false, data)
                }, function (err) {
                    callback(true, err);
                })
        }

    }
}