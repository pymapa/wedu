var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());

//Serve static files from public-folder
app.use(express.static('public'));
app.use(express.static('views'));


var connectedUsers = 0;
io.sockets.on('connection', function(socket) {
    connectedUsers++;
    console.log('user connected');
    console.log("connected users: " + connectedUsers);

    socket.on('add user', function(username) {
        console.log("add user: " + username);
        io.sockets.emit('user joined', {"username":username, "numUsers": connectedUsers})
        io.sockets.emit('login',  {"username":username, "numUsers": connectedUsers});
    })

    
    socket.on('new message', function(data) {
        console.log(data);
        console.log('new message, message: ' + data.message);
        io.sockets.emit('new message', {"username": data.username, 'message': data.message})
    })

    socket.on('disconnect', function() {
        console.log("user disconnected");
        connectedUsers--;
    })
})

app.get('/', function(req, res) {
    res.sendFile('index.html');
})

server.listen(app.get('port'), function() {
    console.log("Server running on port " + app.get('port'));
})