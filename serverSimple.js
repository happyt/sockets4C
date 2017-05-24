var io = require('socket.io').listen(3000);
console.log("Listening...");

io.sockets.on('connection', function (socket) {
  socket.emit('change', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});