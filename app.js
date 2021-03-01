const express = require("express");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose")
// const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/todoListDB", {useNewUrlParser:true})

const itemSchema = ({
  name: String
})
const Item = mongoose.model ("Item", itemSchema);
 
const item1 = new Item ({
  name: "Welcome to your todoList!"
});
const item2 = new Item ({
  name: "Hit the + button to add a new item"
});
const item3 = new Item ({
  name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, function(err){
//   if (err){
//     console.log(err);
    
//   } else {
//     console.log("Successfully saved default items to DB")
//   }
// })

app.set('view engine', 'ejs');

app.get("/", function(req, res){

  // to make data 1
  
  Item.find({}, function(err, foundItems){

    if(foundItems.length === 0) {
        Item.insertMany(defaultItems, function(err){
    if (err){
      console.log(err);
      
    } else {
      console.log("Successfully saved default items to DB")
    }
  })
    }

   res.render("list", {listTitle: "Today", newListItems: foundItems})
  })
// const day = date.getday();

   
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