const mongoose = require('mongoose');
const {Schema} = mongoose;

const entryQueueSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    entryId: String,
    submitted: Date
});

mongoose.model('EntryQueue', entryQueueSchema);