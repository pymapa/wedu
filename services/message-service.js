var Message = require('./../models/message-model');

module.exports = {

    getMessages: function (callback) {
        Message.find({})
            .then(function (data) {
                callback(false, data);
            }, function (error) {
                callback(true, error)
            })
    },

    getMessage: function (questionId, callback) {
        // console.log("get message " + questionId);
        Message.findOne({ _id: questionId })
            .then(function (message) {
                callback(false, message);
            }, function(error) {
                callback(true, error);
            });
    },

    // Save message. callback false if success, true if error
    // Return message _id
    newMessage: function (data, callback) {
        console.log("in service");
        if (!data.lecture) data.lecture = "";
        var message = new Message({
            message: data.message,
            course: data.course,
            lecture: data.lecture,
            user: data.user,
            type: data.type
        });
        message.save()
            .then(function (data) {
                console.log("message saved");
                console.log(data._id);
                callback(false, message);
            }, function (error) {
                console.log(error);
                callback(true, error);
            })
    },

    upvoteMessage: function (data, callback) {
        console.log("upvote");
        Message.findOne({ _id: data._id })
            .then(function (message) {
                message.grade.upvotes.push(data.username);
                message.save()
                    .then(function (data) {
                        callback(false, message)
                    }, function (err) {
                        callback(true, err);
                    })
            })
    },

    downvoteMessage: function (data, callback) {
        Message.findOne({ _id: data._id })
            .then(function (message) {
                message.grade.downvotes.push(data.username);
                message.save()
                    .then(function (data) {
                        callback(false, message)
                    }, function (err) {
                        callback(true, err)
                    })
            })
    }
}