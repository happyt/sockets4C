var portIO = 8082;
var io = require('socket.io')(portIO);
 console.log("Waiting for connections on : ", portIO);

var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    io.emit('time', d.toLocaleTimeString());
//    console.log(".")
}

var urlSerb = 'http://localhost:8081';
var io_client = require( 'socket.io-client' );
var socket2 = io_client.connect('urlSerb');
console.log("Waiting for updates from : ", urlSerb);
 
  socket2.on('time', function (data) {
    console.log(data); 
  });