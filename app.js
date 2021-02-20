const express = require("express");
const bodyParser = require("body-Parser");

const app = express();

app.get("/", function(req, res){

    var today = new Date();
    var currentDay = today.getDay();
    if (currentDay === 6 || currentDay === 0){

        res.sendFile(__dirname + "/index.html")
    }else {

        res.write("<h1> Yay! it's the weekend </h1>");
    }
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})