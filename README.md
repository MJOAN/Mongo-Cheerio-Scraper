# Mongo-Cheerio-Scraper

### Overview
In this assignment, you'll create a web app that lets users view and leave comments on the latest news. But you're not going to actually write any articles; instead, you'll flex your Mongoose and Cheerio muscles to scrape news from another site.

### Before You Begin
1. Create a GitHub repo for this assignment and clone it to your computer.
2. Run `npm init`. When that's finished, install and save these npm packages:
3. express
4. express-handlebars
5. mongoose
6. body-parser
7. cheerio
8. request

9. In order to deploy your project to Heroku, you must set up an mLab provision. mLab is remote MongoDB database that Heroku supports natively. Follow these steps to get it running:

1. Create a Heroku app in your project directory.
2. Run this command in your Terminal/Bash window:
    * `heroku addons:create mongolab`
    * This command will add the free mLab provision to your project.
3. You'll need to find the URI string that connects Mongoose to mLab. Run this command to grab that string:
    * `heroku config | grep MONGODB_URI`
    * Notice the value that appears after `MONGODB_URI =>`. This is your URI string. Copy it to a document for safekeeping.
4. When you’re ready to connect Mongoose with your remote database, you'll need to add it as an [environment variable on Heroku](https://devcenter.heroku.com/articles/config-vars)

* As a reminder, you can check for the environment variable and fall back to a local mongo server:
```
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database    
`var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";`
```
* Then, just pass the `MONGODB_URI` variable to `mongoose.connect`. If you define `MONGODB_URI` on heroku, your production app will automatically use the remote database
* You shouldn't connect to the remote database when developing locally. Your classroom's network may
not function if you do (but it's also best practice to use a local databse for development).

## Instructions
* Create an app that accomplishes the following:
  1. Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article:
     * Headline - the title of the article
     * Summary - a short summary of the article
     * URL - the url to the original article
     * Feel free to add more content to your database (photos, bylines, and so on).
  2. Users should also be able to leave comments on the articles displayed and revisit them later.
  3. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.

### Tips
* Go back to Saturday's activities if you need a refresher on how to partner one model with another.
* Whenever you scrape a site for stories, make sure an article isn't already represented in your database before saving it; we don't want duplicates.
* Don't just clear out your database and populate it with scraped articles whenever a user accesses your site.
* If your app deletes stories every time someone visits, your users won't be able to see any comments except the ones that they post.

### Helpful Links
* [MongoDB Documentation](https://docs.mongodb.com/manual/)
* [Mongoose Documentation](http://mongoosejs.com/docs/api.html)
* [Cheerio Documentation](https://github.com/cheeriojs/cheerio)

- - -

## Copyright
Coding Boot Camp (C) 2016. All Rights Reserved.
