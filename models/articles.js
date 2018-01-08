var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Note = require("./notes");

console.log('Running mongoose version: ', mongoose.version);
 
const ArticleSchema = new Schema({
    headline: {
        type: String,
    },
    link: {
        type: String,
    },
    saved: {
        type: Boolean,
        default: false
    },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Notes' }],
    date:   {  
        type: Date, 
        default: Date.now  
    }
});


console.log('ArticleSchema created!');

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
