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
        console.log("new message");
        // Message to db
        message.user = socket.username;
        messageService.newMessage(message, function (err, data) {
            if (!err) {
                console.log("new message, in callback");
                console.log(data);
                io.sockets.emit('new message', {
                    username: data.user,
                    message: message.message,
                    upvotes: data.upvotes,
                    course: data.course,
                    solved: data.solved,
                    type: data.type,
                    created: data.created,
                    _id: data._id
                });
            }
        });

    })
}