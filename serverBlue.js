var config = require(`./config.js`);
var port = config.bluePort;
var io = require('socket.io')(port);
console.log("Blue test listener on port: " + port);

io.sockets.on("connection",function(socket){
    // Display a connected message
    console.log("client Connected!");

    // When we receive a message...
    socket.on("command",function(data){
        // We got a message... I dunno what we should do with this...
        console.log("blue command: " + JSON.stringify(data));
    });
});


