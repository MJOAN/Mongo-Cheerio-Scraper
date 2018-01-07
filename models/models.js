const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

console.log('Running mongoose version: ', mongoose.version);
 
const Articles = new Schema({
    id          : ObjectId,
    author    : String,
    title     : String,
    body      : String,
    date      : Date
});

var Notes = new Schema({
    id          : ObjectId,
    headline    : String,
    byline      : String,
    body      : String,
    date      : Date
});

const NotesModel = mongoose.model('Notes', Notes);
const ArticlesModel = mongoose.model('Articles', Articles);

console.log('attacking', this.name);


function done(err) {
  if (err) console.error(err);
  mongoose.connection.db.dropDatabase(function() {
    mongoose.disconnect();
    });
};


module.exports = models;