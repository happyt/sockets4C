var io = require("socket.io").listen(8099);
io.set('log level', 1);

io.sockets.on("connection", function (socket) {

    console.log('A Client has Connected to this Server');

    //Let Everyone Know I just Joined   
    socket.broadcast.to('lobby').emit("message",'UC,' + socket.id); // Send to everyone in Room but NOT me  


socket.on("message", function (data) {

//Missing code
socket2.send('message,' + data); //Forward Message to Second Server

});

socket.on("disconnect", function (data) {
    //Send Notification to Second Server
    //Need to figure out later

    //Send Notification to Everyone
    socket.broadcast.emit("message",'UD,' + socket.id ); //Send to Everyone but NOT me

    //Remove user from Session ID
    arSessionIDs.removeByValue(socket.id);      

    //Send Notification to Console
    console.log("disconnecting " + arRoster[socket.id][1]);
});

});

var io_client = require( 'socket.io-client' );
var socket2 = io_client.connect('http://192.168.0.104:8090');
socket2.on('connect', function () {
socket2.emit('C3434M,Test');
});
