var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.load();

var config = require('./config');

mongoose.connect(config.database);
mongoose.connection.once('open', function() {
  console.log('Connected to database in ' + config.database);
})
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB ' + config.database);
})

app.set('port', process.env.PORT || 3001);
app.use(logger('dev'));
app.use(bodyParser.json());

//Built client is served. In development there's webpack server in use.
app.use(express.static('client/build'));

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