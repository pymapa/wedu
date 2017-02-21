var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var logger = require('morgan');
var path = require('path');

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));

//Serve static files from public-folder
app.use(express.static('public'));
app.use(express.static('views'));

io.sockets.on('connection', function(socket) {
    console.log('socket connected!!!');

    socket.on('disconnect', function() {
        console.log("disconnected");
    })
})

app.get('/', function(req, res) {
    res.sendFile('index.html');
})

server.listen(app.get('port'), function() {
    console.log("Server running on port " + app.get('port'));
})