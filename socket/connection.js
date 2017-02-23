module.exports = function (app, io) {

    var connectedUsers = 0;
    io.sockets.on('connection', function (socket) {
        connectedUsers++;

        socket.on('add user', function (data) {
            console.log("add user");
            socket.username = data.username;
            socket.broadcast.emit('user joined', { username: socket.username, numUsers: connectedUsers })
            socket.emit('login', { numUsers: connectedUsers });
        })

        socket.on('typing', function () {
            console.log("typing");
            socket.broadcast.emit('typing', {username: socket.username});
        })

        socket.on('stop typing', function () {
            console.log("stop typing");
            socket.broadcast.emit("stop typing", {username: socket.username});
        })

        socket.on('new message', function (data) {
            console.log("new message");
            io.sockets.emit('new message', {
                username: socket.username, 
                message: data.message});
        })

        socket.on('disconnect', function () {
            console.log("disconnect");
            connectedUsers--;
            socket.broadcast.emit('user left', {
                username: socket.username, 
                numUsers: connectedUsers});
        })
    })

}