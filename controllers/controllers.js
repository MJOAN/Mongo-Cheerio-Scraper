const express = require("express");
const router = express.Router();

const cheerio = require('cheerio');
const request = require('request');

// setup mongoose connection
const databaseUrl = "mongoscraper";
const collections = ["scrapedarticles"];
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/databaseUrl');
var db = mongoose.connection;

const Note = require("../models/notes.js");
const Article = require("../models/articles.js");

// Simple index route
router.get("/", function(req, res) {
  res.render("index");
});


// Scrape data from one site and place it into the mongodb db
router.get("/articles", function(req, res) {

  request("https://www.nytimes.com/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);

    // For each element with a "title" class
    $("article h2").each(function(i, element) {

      var result = {};

      // Save the text and href of each link enclosed in the current element
      result.headline = $(element).children("a").text();      
      result.link = $(element).children("a").attr("href");

      console.log("headline: ", result.headline);
      console.log("link: ", result.link);

      // If this found element had both a title and a link
      if (result.headline && result.link) {

        var newEntry = new Article (result);
        // save the user
        newEntry.save()
          .then(function() {
          res.send({redirect: '/'});
        }).catch(function(err) {
          res.json(err);
        });
          //byline: byline, link: link, date: date
        res.render("index", {headline: result.headline, link: result.link })
        };
      });
    });
  // Send a "Scrape Complete" message to the browser
  console.log("Scrape Complete");
  });


// Retrieve    SAVED  data from the db
router.get("/saved", function(req, res) {
  // Find all results from the articles collection in the db
  db.article.find({}, function(error, result) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    } else {
      //res.json(articles);
        // Send a "Scrape Complete" message to the browser
      console.log("Saved Articles Now Complete");
      //byline: byline, link: link, date: date
      res.render("index", {headline: result.headline, link: result.link })

    }
  });
});



/*
// Handle form submission, save submission to mongo
app.post("/submit", function(req, res) {
  console.log(req.body);
  // Insert the note into the notes collection
  db.notes.insert(req.body, function(error, saved) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the note back to the browser
    // This will fire off the success function of the ajax request
    else {
      res.send(saved);
    }
  });
});

// Retrieve results from mongo
app.get("/all", function(req, res) {
  // Find all notes in the notes collection
  db.notes.find({}, function(error, found) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send json of the notes back to user
    // This will fire off the success function of the ajax request
    else {
      res.json(found);
    }
  });
});


// Update just one note by an id
app.post("/update/:id", function(req, res) {
  
  // When searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IDYOUWANTTOFIND))

  // Update the note that matches the object id
  db.notes.update({
    "_id": mongojs.ObjectId(req.params.id)
  }, {
    // Set the title, note and modified parameters
    // sent in the req's body.
    $set: {
      "title": req.body.title,
      "note": req.body.note,
      "modified": Date.now()
    }
  }, function(error, edited) {
    // Log any errors from mongojs
    if (error) {
      console.log(error);
      res.send(error);
    }
    // Otherwise, send the mongojs response to the browser
    // This will fire off the success function of the ajax request
    else {
      console.log(edited);
      res.send(edited);
    }
  });
});


// Delete One from the DB
app.get("/delete/:id", function(req, res) {
  // Remove a note using the objectID
  db.notes.remove({
    "_id": mongojs.ObjectID(req.params.id)
  }, function(error, removed) {
    // Log any errors from mongojs
    if (error) {
      console.log(error);
      res.send(error);
    }
    // Otherwise, send the mongojs response to the browser
    // This will fire off the success function of the ajax request
    else {
      console.log(removed);
      res.send(removed);
    }
  });
});


// Clear the DB
app.get("/clearall", function(req, res) {
  // Remove every note from the notes collection
  db.notes.remove({}, function(error, response) {
    // Log any errors to the console
    if (error) {
      console.log(error);
      res.send(error);
    }
    // Otherwise, send the mongojs response to the browser
    // This will fire off the success function of the ajax request
    else {
      console.log(response);
      res.send(response);
    }
  });
}); */


module.exports = router;