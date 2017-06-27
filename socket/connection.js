module.exports = function (app, io) {

    var connectedUsers = 0;
    io.sockets.on('connection', function (socket) {
        var userLogged = false;
            console.log("connect");

        socket.on('add user', function (data) {
            if (userLogged) return;
            console.log("add user");
            connectedUsers++;
            userLogged = true;
            socket.user = data.user;
            socket.broadcast.emit('user joined', { user: socket.user, numUsers: connectedUsers })
            socket.emit('login', { numUsers: connectedUsers });
        })

        socket.on('select room', function(data) {
            console.log("select course");
            socket.join(data.room);
            socket.room = data.room;
        })

        require('./messages')(io, socket);

        socket.on('disconnect', function () {
            console.log("disconnect");
            if (userLogged) {
                connectedUsers--;
                socket.leave(socket.room);
                socket.broadcast.emit('user left', {
                    user: socket.user,
                    numUsers: connectedUsers
                });
            }

        })
    })

}