const mongoose = require('mongoose');
var Schema = mongoose.Schema;

console.log('Running mongoose version: ', mongoose.version);
 
const NoteSchema = new Schema({
    id: {
        type: String,
    },
    text: {
        type: String
    },
    date: {
        type: Date
    }
});

console.log('text: ', this.text);

module.exports = mongoose.model('Notes', NoteSchema);