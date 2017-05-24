var io = require('socket.io-client');
var socket = io.connect('http://uipm.gem-technology.com:3000/', { reconnection: true});


// var socket = require('socket.io-client')('http://uipm.gem-technology.com:3000');

console.log("Starting...");

socket.on('connect_error', function(message){
    console.log(message);
});

socket.on('connect', function(){
    console.log("connected");
});
socket.on('change', function(data){
    console.log("change event " + JSON.stringify(data));
});
socket.on('disconnect', function(){
    console.log("disconnected");
});

