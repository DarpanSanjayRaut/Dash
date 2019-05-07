'use strict';
var express = require('express');
var path = require('path');
const cors = require('cors');

var logsRouter = require('./routes/logs');


var app = express();
var port = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/dash')));

app.use('/api/v1/', logsRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/dash/index.html'));
});


var server = app.listen(port);
console.log('Server started on port: ' + port);

var io = require('socket.io').listen(server);

module.exports.emit = emitData;

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

}); 

function emitData(tag, data){
    console.log("emit data")
    io.emit(tag,data);
}
