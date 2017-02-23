module.exports = function (app, io) {

    var connectedUsers = 0;
    io.sockets.on('connection', function (socket) {
        connectedUsers++;
        console.log('user connected');
        console.log("connected users: " + connectedUsers);

        socket.on('add user', function (username) {
            socket.username = username;
            console.log("add user: " + username);
            socket.broadcast.emit('user joined', { numUsers: connectedUsers })
            socket.emit('login', { numUsers: connectedUsers });
        })

        socket.on('typing', function () {
            console.log("user " + socket.username + " is typing");
            socket.broadcast.emit('typing', {username: socket.username});
        })

        socket.on('stop typing', function () {
            console.log("stop typing");
            socket.broadcast.emit("stop typing", {username: socket.username});
        })

        socket.on('new message', function (data) {
            console.log('new message, message: ' + data.message);
            io.sockets.emit('new message', {
                username: socket.username, 
                message: data.message});
        })

        socket.on('disconnect', function () {
            console.log("user disconnected");
            socket.broadcast.emit('user left', {
                username: socket.username, 
                numUsers: connectedUsers});
            connectedUsers--;
        })
    })

}