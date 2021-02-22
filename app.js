const express = require("express");
const bodyParser = require("body-Parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

var items = ["buy", "food", " Cook", "play football"];
   


app.set('view engine', 'ejs');

app.get("/", function(req, res){

    var today = new Date();
    
    var option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    
    var day = today.toLocaleDateString("en-US", option);

    res.render("list", {kindOfDay: day, newListItems: items})
})

app.post("/", function(req, res){
     itemName = req.body.newItem;
     items.push(itemName);
    
    res.redirect('/');
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})