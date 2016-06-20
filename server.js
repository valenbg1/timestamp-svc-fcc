var express = require("express");
var app = express();
var strftime = require("strftime");

function getTime(str) {
    var unixTime = ~~Number(str);
    
    if (unixTime)
        return new Date(unixTime);
     
    /*   
    var natTime = new Date(str);
    
    if (natTime)
        return natTime;
    */
        
    return null;
}

function strDate(date) {
    return strftime("%B %d, %Y", date);
}

app.get("/:str",
    function(req, res) {
        var date = getTime(req.params.str);
        var ret = {
            "unix": null,
            "natural": null
        };
        
        if (date) {
            ret.unix = date.getTime();
            ret.natural = strDate(date);
        }
        
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(ret));
    });

var port = process.env.PORT || 8080;
app.listen(port,
    function () {
        console.log("Node.js listening on port " + port + "...");
    });