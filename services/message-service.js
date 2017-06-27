var Message = require('./../models/message-model');

module.exports = {

    TYPE_QUESTION: 1,
    TYPE_MESSGE: 2,

    getQuestions: function(callback) {
        Message.find({type: this.TYPE_QUESTION})
            .then(function (data) {
                callback(false, data);
            }, function (error) {
                callback(true, error)
            })
    },

    // Messages by course tag
    getMessagesByCourseId: function(_id, callback) {
        Message.find({"course": _id})
        .then(function (data) {
                callback(false, data);
            }, function (error) {
                callback(true, error)
            })
    },

    /**
     * Get messages from thread of the single question
     */
    getMessages: function (questionId, callback) {
        Message.findOne({_id: questionId}).select({thread:1})
            .then(function (data) {
                callback(false, data);
            }, function (error) {
                callback(true, error)
            })
    },

    getMessage: function (questionId, callback) {
        Message.findOne({ _id: questionId })
            .then(function (data) {
                callback(false, data);
            }, function (error) {
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
                message.grade.upvotes.push(data.user);
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
                message.grade.downvotes.push(data.user);
                message.save()
                    .then(function (data) {
                        callback(false, message)
                    }, function (err) {
                        callback(true, err)
                    })
            })
    },

    addMessageToQuestion: function (questionId, message, callback) {
        Message.findOne({ _id: questionId })
            .then(function (question) {
                question.thread.messages.push(message);
                question.save()
                    .then(function (data) {
                        callback(false, message);
                    }, function (err) {
                        callback(true, err);
                    })
            });
    }
}