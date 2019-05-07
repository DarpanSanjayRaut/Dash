let socket = {};

socket.io = {};

const logsSocket = require('./routes/logs');



socket.init = (_io) => {
    socket.io = _io;
    socket.events();
}

socket.events = () => {
    socket.io.sockets.on('connection', (socket) => {
        console.log('new user connected with id ' + socket.id);
        socket.on('uploaded', (data) => {
            console.log(data);
            socket.io.emit('uploaded', data);
        });
    
        socket.on('disconnect', function() {
            // remove socket from in-memory user connection list
            console.log('socket disconnected ' + socket.id);
        });

    });
}



module.exports = socket;