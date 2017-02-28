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

    // Save message. callback false if success, true if error
    // Return message _id
    newMessage: function (data, callback) {
        if (!data.lecture) data.lecture = "";
        var message = new Message({
            message: data.message,
            course: data.course,
            lecture: data.lecture,
            user: data.user,
            category: data.category
        });
        message.save()
            .then(function (data) {
                console.log("message saved");
                console.log(data._id);
                callback(false, message);
            }, function (error) {
                callback(true, error);
            })
    }

}