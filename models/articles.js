const mongoose = require('mongoose');
var Schema = mongoose.Schema;

console.log('Running mongoose version: ', mongoose.version);
 
const ArticleSchema = new Schema({
    id: {
        type: String,
    },
    headline: {
        type: String
    },
    byline: {
        type: String
    },
    date:   {  
        type: Date   
    }
});

console.log('text: ', this.text);


module.exports = mongoose.model('Articles', ArticleSchema);
