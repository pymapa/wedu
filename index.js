var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var logger = require('morgan');
var path = require('path');



app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));

//Serve static files from public-folder
app.use(express.static(path.join(__dirname, 'public')));



server.listen(app.get('port'), function() {
    console.log("Server running on port " + app.get('port'));
})