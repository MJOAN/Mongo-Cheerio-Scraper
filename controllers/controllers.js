const express = require("express");
const router = express.Router();

const cheerio = require('cheerio');
const request = require('request');

// setup mongoose connection
const databaseUrl = "mongoscraper";
const collections = ["scrapedarticles"];
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/databaseUrl');
const db = mongoose.connection;

const Note = require("../models/notes.js");
const Article = require("../models/articles.js");

var result = {};
var saved = {};

// Simple index route
router.get("/", function(req, res) {
  res.render("index",  {
       title: 'Mongo Scraper'
  });
});

// Scrape data from one site and place it into the mongodb db
router.get("/scrape", function(req, res) {
  console.log("called this route");
  
  var result = [];

  request("https://www.nytimes.com/", function(error, response, html) {
    var $ = cheerio.load(html);


    $("article h2").each(function(i, element) {

        // Save the text and href of each link enclosed in the current element
        var headline = $(element).text();   
        var summary = $(element).children("a").text();   
        var link = $(element).children("a").attr("href");

        result.push({
          headline: headline,
          summary: summary,
          link: link
        });

        console.log(headline);

        // If this found element had both a title and a link
        if (result.headline && result.summary && result.link) {

          var newEntry = new Article (result);
          // save the user
          newEntry.save()
        }
        console.log("after new-entry to db")
      });

      res.render('index', {
          title: 'Scaped Articles',
          result
      })
    });
  });


router.get("/saved", function(req, res) {
  db.Article.find({}, function(err, saved) {
      res.render('index', {
          title: 'Saved Articles',
          saved
      });
    });
});


router.post("/save", function(req, res) {
  console.log("req", req.body)

  var Articles = new Article(req.body);  
  db.Articles.save((err, savedArticles) => {  
    if (err) {
        res.status(500).send(err);
    }
    res.status(200).send(savedArticles);
  });
});


router.post("/notes/:id", function(req, res) {
  // Update the note that matches the object id
  Note.update({
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


module.exports = router;