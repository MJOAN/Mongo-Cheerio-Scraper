
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");
//const logger = require("logger");
const app = express();

// public dir static
app.use(express.static("public"));

// set express data parsing
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set handlebars views
//app.engine("handlebars", exphbs({extname: "handlebars", defaultLayout: "main", layoutsDir: __dirname + "/views/layouts" }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('views', __dirname + '/views')


// models required
require("./models/notes.js");
require("./models/articles.js");

// setup mongoose connection
const databaseUri = 'mongodb://localhost/mongoscraper';
const collections = ["scrapedarticles"];

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect(databaseUri);
}


console.log("created new database: ", databaseUri)

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

console.log("created new database: ", databaseUri)

app.listen(3000, function() {
  console.log("App running on port 3000!");
});

// MONGOURI: mongodb://heroku_1qqf4x9g:pcs8m689ekgi02qrtlcr1toe71@ds155577.mlab.com:55577/heroku_1qqf4x9g
