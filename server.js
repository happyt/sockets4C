var io = require('socket.io')(8081);

var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    io.emit('time', d.toLocaleTimeString());
//    console.log(".")
}
