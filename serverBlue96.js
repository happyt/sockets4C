var config = require(`./config.js`);
var W3CWebSocket = require('websocket').w3cwebsocket;
var QWC = require(`qwebchannel`);
var blueUrl = config.blueUrl;

var sock = require('socket.io');
var DEBUGMODE = true; // set to true to enable printing debugging information to console; set to false in release
    /**
     * Scheduler API object. Available after onready() callback fires.  */
var TitlerPro = undefined;

console.log("Blue test listener to: " + blueUrl);

// Initiate the server connection.
var socket = new W3CWebSocket(blueUrl);
socket.onclose = function () {
    if (DEBUGMODE)
        console.warn("WebSocket closed");
};

socket.onerror = function (error) {
    if (DEBUGMODE)
        console.error("WebSocket error", error);
};

socket.onopen = function () {
    if (DEBUGMODE)
        console.log("WebSocket connected, setting up QWebChannel");

    // Establish API connection.
    new QWC.QWebChannel(socket, function (channel) {
        if (DEBUGMODE)
            console.log("QWebChannel connected");
        TitlerPro = channel.objects.scheduler;

        TitlerPro.variablesChanged.connect(function (inputName, variables) {
            // Because there is a single server for all HTML inputs, this callback will be fired for any variable change and contain data we're not neccessary interested in, so we filter using the input name we set in the definition xml file.
                console.log("Variables changed", inputName, variables);
        });
    
    //         // Check if the specific variable changed using its name from the input definition xml, then update the page control.
    //         if ("Name" in variables) {
    //             document.getElementById("name").value = variables["Name"];
    //         }

    //         Use "Name", Country", "Time", "Faults", "TimeFaults" in variables) {

        // Update and schedule variables.
        // scheduleVariables(inputName, queuingMode, queueName, variables)
        // inputName - input bevavior name from the defintion xml
        // queuingMode - either "play"/"update"/"auto" or empty to use the default mode from defintion xml;
        //               "play" mode queues up titles with the new values and plays them back in turn after they finish rendering;
        //               "update" mode replaces the value of an existing title that may be playing already, or starts playback immediately otherwise;
        //               "auto" is either "play" or "update" based on project settings
        // queueName - arbitrary queue name; titles are placed in queues for playback, and only one title may be playing back at a time; use the input name for sufficiently unique queue name that doesn't clash with other titles
        // variables - dictionary of variable:value pairs; names must match the defintion xml)
      //  TitlerPro.scheduleVariables("HTML Gem", "update", "HTML Gem", { "Name": "Drab" });
        // TitlerPro.scheduleVariablesEx();
        // Update and schedule variables with additional options.
        //                      action, time, input name, channel name, queue name, title name, startSeg, endSeg, vriables
        TitlerPro.scheduleVariablesEx("update", 0, "HTML Gem", "", "HTML Gem", "quick", "", "", { "Name": "dragon" });
 
    });
        
}








