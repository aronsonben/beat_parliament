const mongoose = require('mongoose');
const {Schema} = mongoose;

const contestSchema = new Schema({
    _id: String
});

mongoose.model('contests', contestSchema);