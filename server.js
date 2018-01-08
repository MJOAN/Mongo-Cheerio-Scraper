
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

// public dir static
app.use(express.static("public"));

// set handlebars views
app.engine("handlebars", exphbs({extname: "handlebars", defaultLayout: "main", layoutsDir: __dirname + "/views/layouts" }));
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// set express data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// models required
const note = require("./models/notes.js");
const article = require("./models/articles.js");

// setup mongoose connection
const databaseUrl = "mongoscraper";
const collections = ["scrapedarticles"];

const config = require("./config/database.js")
mongoose.connect('mongodb://localhost/databaseUrl');
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
 
// Routes
/*app.get(  '/',            routes.index );
app.post( '/articles',    routes.articles);
app.get( '/saved',    routes.articles);
app.post(  '/note',    routes.note );
app.get( '/delete',  routes.delete );*/



// mongoose.connect(config.url);
// mongoose.Promise = global.Promise;

/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/

console.log("created new database: ", databaseUrl)

app.listen(3000, function() {
  console.log("App running on port 3000!");
});

module.exports = app;
