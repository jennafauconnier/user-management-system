const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./users');
const cors = require("cors")



const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req,res) {
  res.send("Connexion etablie");
});

app.get("/users", users.controller.getUser);

app.post("/users", users.controller.createUser);

app.post("/view", users.controller.viewUser);

mongoose.connect("mongodb://localhost:27017/user-management-system", {
  useNewUrlParser: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connecté a MongoDB !");
});

app.listen(7890, function() {
  console.log('This app is on port 7890 ! ');
})