const mongoose = require('mongoose');
const {Schema} = mongoose;

const artistSchema = new Schema({
    _id: String,
    name: String,
    wins: Number,
    active: Boolean,
    tracks: [
        {
            id: String,
            titleId: String,
            title: String,
            fullName: String,
            link: String,
            active: Boolean,
            submitted: Date
        }
    ],
    totalVotes: Number
});

mongoose.model('Artists', artistSchema);