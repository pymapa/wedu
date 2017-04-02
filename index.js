var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

mongoose.connect(config.database);
mongoose.connection.once('open', function() {
  console.log('Connected to database in ' + config.database);
})
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB ' + config.database);
})

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());

//Serve static files from public-folder
app.use(express.static('public'));
app.use(express.static('client'));
// app.use(express.static('views'));

//Sockets
require('./socket/connection')(app, io);

//REST-api
require('./api/course-api')(app);
require('./api/message-api')(app);

app.get('/', function(req, res) {
    res.sendFile('index.html');
})

server.listen(app.get('port'), function() {
    console.log("Server running on port " + app.get('port'));
})