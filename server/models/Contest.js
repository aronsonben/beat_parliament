const mongoose = require('mongoose');
const EntrySchema = require('./Entry');
const {Schema} = mongoose;

const contestSchema = new Schema({
    contestNumber: Number,
    contestDescription: String,
    winner: String,
    active: Boolean,
    start_date: Date,
    end_date: Date,
    numEntries: Number, 
    entries: [{ entry: String }]
});

mongoose.model('Contests', contestSchema);