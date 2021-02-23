const express = require("express");
const bodyParser = require("body-Parser");
const date = require(__dirname + "/date.js")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

const items = ["buy", "food", " Cook", "play football"];
   
const workItems =[];

app.set('view engine', 'ejs');

app.get("/", function(req, res){

const day = date.getday();

    res.render("list", {listTitle: day, newListItems: items})
})



app.post("/", function(req, res){

  const   itemName = req.body.newItem;

  if (req.body.list === "Work") {
      workItems.push(itemName);
      res.redirect('/work');
  } else {
    items.push(itemName);
    
    res.redirect('/');
  }
     
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})



app.listen(3000, function(){
    console.log("Server is running on port 3000")
})