const express = require("express");
const bodyParser = require("body-Parser");

const app = express();

app.get("/", function(req, res){
    res.send("HELLO");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})