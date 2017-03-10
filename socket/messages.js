var messageService = require('./../services/message-service');

module.exports = function (io, socket) {
    socket.on('typing', function () {
        console.log("typing");
        socket.broadcast.emit('typing', { username: socket.username });
    })

    socket.on('stop typing', function () {
        console.log("stop typing");
        socket.broadcast.emit("stop typing", { username: socket.username });
    })

    socket.on('new message', function (message) {
        // Message to db
        message.user = socket.username;
        messageService.newMessage(message, function (err, data) {
            if (!err) {
                console.log("new message, in callback");
                console.log(data);
                io.sockets.emit('new message', {
                    user: data.user,
                    message: message.message,
                    grade: data.grade,
                    course: data.course,
                    solved: data.solved,
                    type: data.type,
                    createdJS: data.created,
                    created: data.created.getTime(),
                    _id: data._id
                });
            } else {
                console.log("new message, in error " + err);
            }
        });

    })

    socket.on('upvote', function (data) {
        data.user = socket.username;
        data._id = data.messageId;
        messageService.upvoteMessage(data, function (err, data) {
            io.sockets.emit('voted', {
                messageId: data._id,
                grade: data.grade
            })
        })

    })

    socket.on('downvote', function (data) {
        data.user = socket.username;
        data._id = data.messageId;
        messageService.downvoteMessage(data, function (err, data) {
            io.sockets.emit('voted', {
                messageId: data._id,
                grade: data.grade
            })
        })
    })
}