'use strict';
var express = require('express');
var path = require('path');
const cors = require('cors');

var usersRouter = require('./routes/logs');


var app = express();
var port = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/dash')));

app.use('/api/v1/user', usersRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/dash/index.html'));
});

var server = app.listen(port);
console.log('Server started on port: ' + port);

let http = require('http').Server(app);
let io = require('socket.io')(http);


module.exports.emit = emitData;

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

}); 

function emitData(data){
    io.emit(this.tag,data);
}

http.listen(port, () => {
    console.log('started on port '+port);
});
