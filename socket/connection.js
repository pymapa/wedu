module.exports = function (app, io) {

    var connectedUsers = 0;
    io.sockets.on('connection', function (socket) {
        console.log("connection")
        var userLogged = false;

        socket.on('add user', function (data) {
            console.log("add user " + data.user);
            if (userLogged) return;
            connectedUsers++;
            userLogged = true;
            socket.user = data.user;
            socket.broadcast.emit('user joined', { user: socket.user, numUsers: connectedUsers })
            socket.emit('login', { numUsers: connectedUsers });
        })

        socket.on('select room', function(data) {
            console.log("select course " + data.room);
            socket.join(data.room);
            socket.room = data.room;
        })

        require('./messages')(io, socket);

        socket.on('disconnect', function () {
            console.log("disconnect");
            if (userLogged) {
                connectedUsers--;
                socket.broadcast.emit('user left', {
                    user: socket.user,
                    numUsers: connectedUsers
                });
            }

        })
    })

}