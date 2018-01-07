const express = require("express");
const exphbs = require("express-handlebars");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

const routes = require("./controllers/controllers.js");

app.use("/", routes);


//Set up default mongoose connection
/*var config = require('./config/database');
mongoose.connect(config.url);*/

// Database configuration
const databaseUrl = "scraper";
const collections = ["scrapedData"];
const db = mongoose.connect('mongodb://localhost/databaseUrl');


/*//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once("open", function() {
  console.log("Mongoose connection successful.");
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});




module.exports = app;
