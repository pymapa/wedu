var messageService = require('./../services/message-service');

module.exports = function(io, socket) {
    socket.on('typing', function () {
            console.log("typing");
            socket.broadcast.emit('typing', {username: socket.username});
        })

        socket.on('stop typing', function () {
            console.log("stop typing");
            socket.broadcast.emit("stop typing", {username: socket.username});
        })

        socket.on('new message', function (data) {
            // Message to db
            messageService.newMessage(data);
            console.log("new message");
            io.sockets.emit('new message', {
                username: socket.username, 
                message: data.message});
        })
}