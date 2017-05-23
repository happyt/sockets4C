// Server 2
var port = 8100;
var io = require("socket.io").listen(port);
console.log("Listening on " + port)
io.sockets.on("connection",function(socket){
    // Display a connected message
    console.log("Server-Client Connected!");

    // When we receive a message...
    socket.on("message",function(data){
        // We got a message... I dunno what we should do with this...
        console.log("message: " + data);
    });
});
