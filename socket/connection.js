module.exports = function (app, io) {

    var connectedUsers = 0;
    io.sockets.on('connection', function (socket) {
        connectedUsers++;

        socket.on('add user', function (data) {
            socket.username = data.username;
            socket.broadcast.emit('user joined', { username: socket.username, numUsers: connectedUsers })
            socket.emit('login', { numUsers: connectedUsers });
        })

        socket.on('typing', function () {
            socket.broadcast.emit('typing', {username: socket.username});
        })

        socket.on('stop typing', function () {
            socket.broadcast.emit("stop typing", {username: socket.username});
        })

        socket.on('new message', function (data) {
            io.sockets.emit('new message', {
                username: socket.username, 
                message: data.message});
        })

        socket.on('disconnect', function () {
            socket.broadcast.emit('user left', {
                username: socket.username, 
                numUsers: connectedUsers});
            connectedUsers--;
        })
    })

}