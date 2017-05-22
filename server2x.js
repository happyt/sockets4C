var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server),
    util = require('util'),
    bodyParser = require('body-parser');
var port = process.env.port || 80;
server.listen(port);
console.log("listening on port: " + port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/addNewTagToService", function (req, res) {
    // look for parameters from form input
    var data = {
        ID: req.body.ID,
    };
    console.log("sending request to interperet new data");
    // send the message to console app
    io.emit("test",data);
    res.send("OK");
});