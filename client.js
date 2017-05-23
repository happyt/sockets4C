// Client
var config = require(`./config.js`);

var io = require("socket.io")
var socket = io('http://localhost');
socket.on('connect', function(){
    socket.emit("message","This is my message");

    socket.on('message',function(data){
        console.log("We got a message: ",data);
    });
});