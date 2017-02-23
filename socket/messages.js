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
                console.log("new message");
                io.sockets.emit('new message', {
                    username: data.user,
                    message: message.message,
                    grade: data.grade
                    // _id: data._id
                });
            }
        });

    })
}