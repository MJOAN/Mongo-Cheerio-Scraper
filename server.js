const express = require("express");
const exphbs = require("express-handlebars");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");

const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration
const databaseUrl = "scraper";
const collections = ["scrapedData"];
const db = mongoose.connect('mongodb://localhost/databaseUrl');


const NotesModel = mongoose.model('Notes', Notes);
const ArticlesModel = mongoose.model('Articles', Articles);

const routes = require("./controllers/controllers.js");

app.use("/", routes);


app.listen(3000, function() {
  console.log("App running on port 3000!");
});
