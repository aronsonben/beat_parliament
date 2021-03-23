const mongoose = require('mongoose');
const {Schema} = mongoose;

const entrySchema = new Schema({
    _id: String,
    name: String,
    contest: String,
    votes: Number,
    artist: {
        _id: String,
        name: String,
        track: {
            _id: String,
            title: String,
            link: String,
        }
    }, 
    active: Boolean,
    winner: Boolean,
    date_submitted: Date
});

mongoose.model('Entries', entrySchema);