const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CatModel = require("./models/Cat");
const hbs = require("hbs");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));

mongoose
  .connect("mongodb://127.0.0.1:27017/examples")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

app.get("/", (req, res) => {
  CatModel.find()
    .then((data) => {
      console.log(data);
      res.render("index.hbs", { cats: data });
    })
    .catch((error) => console.log(error));
});

app.get("/create-cat", (req, res) => {
  const cat = {
    name: "Fluffy",
    age: 2,
    neutered: true,
    colors: "brown",
  };

  CatModel.create(cat)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});

app.get("/cats", (req, res) => {
  CatModel.findById("664648dc5eaaf599820345a7")
    .then((data) => res.render("cat.hbs", { cat: data }))
    .catch((error) => console.log(error));
});

app.listen(3000, () => console.log("Server listening..."));
