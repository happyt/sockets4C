var config = require(`./config.js`);
var port = config.gemPort;
var io = require("socket.io").listen(port); // This is the Server for the GUI

// v2.0   var io = require('socket.io')(port);
console.log("Gem test listener on port: " + port);

io.sockets.on("connect",function(socket){
    // Display a connected message
    console.log("client Connected!");

    // When we receive a message...
    socket.on("message",function(data){
        // We got a message... I dunno what we should do with this...
        console.log("message: " + data);
    });

    socket.send('change', data, 3503, 1);
});

var myVar = setInterval(myTimer, 5000);

function myTimer() {
    var d = new Date();
    var data = {
        time: d.toLocaleTimeString(),
        bodyA: "one string",
        bodyB: 23,
        bodyC: "and so on"
    }
//   io.emit('change', data, 3503, 1);
    io.send('change', data);
    console.log(".")
}
