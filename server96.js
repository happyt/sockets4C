// Server 1
var config = require(`./config.js`);
var port = config.myPort;
var io = require("socket.io").listen(port); // This is the Server for the GUI
console.log("Listening on " + port)

var fs = require("fs");
var logPath = config.logFile;
console.log("writing to " + logPath)

console.log("gem url " + config.gemUrl)         // connection to gem
var gemio = require('socket.io-client');
var gem_server = gemio.connect('http://uipm.gem-technology.com:3000/', { reconnection: true});

// var gem_server = require("socket.io-client")('http://uipm.gem-technology.com:3000/'); // This is a client connecting to gem 

var event_id = 3603;
var start_order = 1;
var messageCount = 0;

// var blue_server = require("socket.io-client")(config.blueUrl); // This is a client connecting to blue 
// blue_server.on("connect", function () {
//     console.log("Connected to blue.. ");
// });


function parseChangeData(data) {
 //   console.log("blue command: " + JSON.stringify(data));
    logData(data);
 //   blue_server.emit('command', { my: 'data' }); 
    //         console.log("change invoked");
    //         console.log("data = " + JSON.stringify(data));
    // //        document.getElementById ('RidPos').innerHTML 		= data.riding_rank;
    //         document.getElementById ('WarmupFault').innerHTML 	= data.warm_up_penalty_points;
    //         document.getElementById ('ObsFault').innerHTML 		= data.obstacle_n_penalty_points;
    //         document.getElementById ('TimeFault').innerHTML 	= data.time_penalty_points;
    //         document.getElementById ('CurStand').innerHTML 		= data.individual_finish_rank;
    //         if(data.riding_status != "") {
    //             document.getElementById('RidPointsTop').innerHTML = data.riding_points;
    //             document.getElementById('RidPointsBottom').innerHTML = data.riding_points;
    //         } else {
    //             document.getElementById('RidPointsTop').innerHTML = data.riding_status;
    //             document.getElementById('RidPointsBottom').innerHTML = data.riding_status;
    //         }
    //         document.getElementById ('MpPoints').innerHTML 		= data.mp_points;
}

function parseSocketDataRelay(data) {
    logData(data);

}

function parseSocketData(data) {
    logData(data);

}

var tempData = [{
    "RunningResultId":12319,
    "Hits":1,
    "Misses":1,
    "NumberOfShots":2,
    "Time":50000,
    "CurrentRound":"27",
    "PositionInCurrentRound":7,
    "Shooting":[0,1],
    "IsTimedOut":true,
    "IsShooting":true,
    "AthleteId": 10842
},{
    "RunningResultId":12318,
    "Hits":5,
    "Misses":0,
    "NumberOfShots":5,
    "Time":10430,
    "CurrentRound":"10",
    "PositionInCurrentRound":3,
    "Shooting":[1,1,1,1,1],
    "IsTimedOut":false,
    "IsShooting":true,
    "AthleteId":6161
}];

logData(tempData);

function logData(data) {
    // We received a message
//    console.log("data = " + JSON.stringify(data));
    var posn = 0;
    var suffix = "th";
    messageCount++;
    console.log("messages: " + messageCount + " ,  " + data.length);
    if (data.length !== undefined) {
    data.forEach(function (entry) {
        if (entry.IsShooting) {
            posn = entry.PositionInCurrentRound;
            suffix = "th";
            if (posn === 0) suffix = "?"; 
            if ((posn % 10) === 1 && posn !== 11) suffix = "st"; 
            if ((posn % 10) === 2 && posn !== 12) suffix = "nd"; 
            if ((posn % 10) === 3 && posn !== 13) suffix = "rd"; 
            console.log(`${entry.AthleteId}: ${entry.PositionInCurrentRound}${suffix},  ${entry.Hits},${entry.Misses},${entry.NumberOfShots}, ${entry.Shooting}`);
        }
    
        });
    }

    var logLine = Date.now() + ", " + JSON.stringify(data)

    fs.appendFile(logPath, logLine + "\n", function (error) {
        if (error) {
            console.error("write error:  " + error.message);
        } else {
            //         console.log("Successful Write to " + logPath);
        }
    });
}

gem_server.on("connect", function () {
//    if (config.sport === "riding") {
//        gem_server.emit('riding-connected', '3503', '1');  // neccessary ??
//        console.log('Connected riding:');
//    }

    console.log("Connected to gem... ");

    gem_server.on('change', function (data, event_id_update, start_order_update) {
        console.log("change - event_id_update " + event_id_update + "; start_order_update " + start_order_update);
   //     if (event_id_update == event_id && start_order_update == start_order) {
            parseChangeData(data);
  //      }
    });

    gem_server.on('switch', function (event_id_switch, start_order_switch) {
        console.log("switch - " + event_id_switch + ", " + start_order_switch);
        event_id = event_id_switch;
        //        window.location.href = "http://gem-..riding-results"  + "/" + event_id_switch + "/" + start_order_switch;
    });

    gem_server.on('shooting', function (data) {
        var parsed = JSON.parse(data);
        console.log(`shooting: ${parsed.event} relay? ${parsed.isRelay}`);
 //       if (event_id === parsed.event) {
            if (parsed.isRelay)
                parseSocketDataRelay(parsed.data);
            else
                parseSocketData(parsed.data);
 //       }
    });
});

io.sockets.on("connect", function (socket) {
    // Display a connected message
    console.log("Client connected!");

    // When we receive a message...
    socket.on("message", function (data) {
        // We need to just forward this message to our other guy
        // We are literally just forwarding the whole data packet
        other_server.emit("message", data);
    });

    socket.on("disconnect", function (data) {
        // We need to notify Server 2 that the client has disconnected
        other_server.emit("message", "UD," + socket.id);

        // Other logic you may or may not want
        // Your other disconnect code here
    });
});
