const mongoose = require('mongoose');
const {Schema} = mongoose;

const entrySchema = new Schema({
    _id: String,
    contest: String,
    artist: {
        _id: String,
        name: String,
        wins: Number,
        active: Boolean,
        tracks: [
            {
                _id: String,
                title: String,
                link: String,
                active: Boolean,
                submitted: Date
            }
        ]
    },
    votes: Number, 
    active: Boolean,
    winner: Boolean,
    date_submitted: Date
});

mongoose.model('entries', entrySchema);