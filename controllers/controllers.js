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

var result = [];

// Simple index route
router.get("/", function(req, res) {
  res.render("index");
});



// Scrape data from one site and place it into the mongodb db
router.get("/scrape", function(req, res) {
  console.log("scrape route")
  request("https://www.nytimes.com/", function(error, response, html) {
  // console.log("response", response)
  // Load the html body from request into cheerio
    var $ = cheerio.load(html);

/*    var articles = {
        headline: "Our first headline",
        summary: "Our first summary",
        link: "www.link.com"
    }
*/
    $("article h2").each(function(i, element) {

      // Save the text and href of each link enclosed in the current element
      var headline = $(element).text();   
      var summary = $(element).children("a").text();   
      var link = $(element).children("a").attr("href");

      console.log("headline: ", headline);
      console.log("link: ", link);

      var result = {
        headline: headline,
        summary: summary,
        link: link
      };

       console.log("result: ", result)
      // If this found element had both a title and a link
      if (result.headline && result.link) {

        var newEntry = new Article (result);
        // save the user
        newEntry.save()
      }

        console.log("after new-entry to db")
      });
        var hbsObject = { 
          headline: result.headline, 
          summary: result.summary, 
          link: result.link 
        };
      
      return res.render("index", hbsObject)  //res ends backend
    });
  });




// Retrieve results from mongo
router.get("/saved", function(req, res) {
  // Find all notes in the notes collection
  db.Article.find({}, function(error, saved) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send json of the notes back to user
    // This will fire off the success function of the ajax request
    else {
      //res.json(saved);
      console.log("Saved Articles Now Complete");
      res.render("index", {headline: result.headline, link: result.link })
    }
  });
});


// router.post("/notes/:id", function(req, res) {
//   db.Note.create([  // check mongoose create
//     "title", "text"
//   ], [
//     req.body.title, req.body.text
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// })



// Update just one note by an id
router.post("/notes/:id", function(req, res) {
  
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
      "text": req.body.text,
      "date": Date.now()
    }
  }, function(error, note) {
    // Log any errors from mongojs
    if (error) {
      console.log(error);
      res.send(error);
    }
    // Otherwise, send the mongojs response to the browser
    // This will fire off the success function of the ajax request
    else {
      console.log(note);
      res.send(note);
    }
  });
});



// Delete One from the DB
router.get("/delete/:id", function(req, res) {

  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  // Remove a note using the objectID
  db.Note.remove({
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



// Export routes for server.js to use.
module.exports = router;