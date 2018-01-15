
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

// public dir static
app.use(express.static("public"));

// set express data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set handlebars views
//app.engine("handlebars", exphbs({extname: "handlebars", defaultLayout: "main", layoutsDir: __dirname + "/views/layouts" }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// models required
require("./models/notes.js");
require("./models/articles.js");

// setup mongoose connection
const databaseUrl = "mongoscraper";
const collections = ["scrapedarticles"];

const config = require("./config/database.js")
mongoose.connect('mongodb://localhost/databaseUrl' || MONGODB_URI);
console.log("created new database: ", databaseUrl)

//Get the default connection
var db = mongoose.connection;

/// bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// log success once in mongoose
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// routes
const routes = require("./controllers/controllers.js");
app.use("/", routes);

console.log("created new database: ", databaseUrl)

app.listen(3000, function() {
  console.log("App running on port 3000!");
});

// MONGOURI: mongodb://heroku_1qqf4x9g:pcs8m689ekgi02qrtlcr1toe71@ds155577.mlab.com:55577/heroku_1qqf4x9g
