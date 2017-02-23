module.exports = function (app, io) {

    var connectedUsers = 0;
    io.sockets.on('connection', function (socket) {
        connectedUsers++;
        console.log('user connected');
        console.log("connected users: " + connectedUsers);

        socket.on('add user', function (username) {
            console.log("add user: " + username);
            socket.broadcast.emit('user joined', { "username": username, "numUsers": connectedUsers })
            socket.emit('login', { "username": username, "numUsers": connectedUsers });
        })

        socket.on('typing', function (data) {
            console.log("user " + data.username + " is typing");
            socket.broadcast.emit('typing', data);
        })

        socket.on('stop typing', function (data) {
            console.log("stop typing");
            console.log(data);
            socket.broadcast.emit("stop typing", data);
        })

        socket.on('new message', function (data) {
            console.log(data);
            console.log('new message, message: ' + data.message);
            io.sockets.emit('new message', data);
        })

        socket.on('user left', function (data) {
            console.log('user left');
            console.log(data);
            socket.broadcast.emit('user left', data);
        })

        socket.on('disconnect', function () {
            console.log("user disconnected");
            connectedUsers--;
        })
    })

}