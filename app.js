const express = require("express");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");
const _ = require("lodash"); //to lowercase
// const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

mongoose.connect(
  "mongodb+srv://admin-rana:test123@cluster0.oibp6.mongodb.net/todoListDB",
  { useNewUrlParser: true }
);

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


//list schema
const listSchema = ({
  name: String,
  items: [itemSchema]
})
const List = mongoose.model("List", listSchema);

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
  res.redirect("/")
    }

   res.render("list", {listTitle: "Today", newListItems: foundItems})
  })


   
})

//listName
app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if(!foundList){
        const list = new List ({
          name: customListName,
          items: defaultItems
        })
        list.save();
        res.redirect("/")
      } else{
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
      }
    }
  })


})

app.post("/", function(req, res){

  const   itemName = req.body.newItem;
  const   listName = req.body.list;

  const item = new Item ({
    name: itemName
  });

  if (listName === "Today"){
    item.save();
    res.redirect("/")
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName)
    })
  }

     
})

app.post("/delete", function(req, res){
  const checkBoxId = req.body.checkbox ;
  const listName = req.body.listName;

  if (listName === "Today"){
    Item.findByIdAndDelete(checkBoxId, function(err){
      if (!err){
        console.log("Successfully deleted checked item");
  }
    })
} else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkBoxId}}}, function(err, foundList){
      if (!err){
        res.redirect("/" + listName);
      }
    })
}
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);

app.listen(port, function(){
    console.log("Server is running on port 3000")
})