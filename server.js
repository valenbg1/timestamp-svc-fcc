var express = require("express");
var app = express();
var strftime = require("strftime");

function getTime(str) {
    var ret = isNaN(str) ? new Date(Date.parse(str)) : new Date(+str);
    
    if (!isNaN(ret.getTime()))
        return ret;
        
    return null;
}

app.use("/", express.static("public"));

app.get("/:str",
    function(req, res) {
        var date = getTime(req.params.str);
        var ret = {
            "unix": null,
            "natural": null
        };
        
        if (date) {
            ret.unix = date.getTime();
            ret.natural = strftime("%B %d, %Y", date);
        }
        
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(ret));
    });

var port = process.env.PORT || 8080;
app.listen(port,
    function () {
        console.log("Node.js listening on port " + port + "...");
    });