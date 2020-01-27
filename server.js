const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const vote = require('./server/vote');

// Import models (once created)
require('./server/models/Contest');
require('./server/models/Entry');

module.exports = app;

// Setup MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beatParliament');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to db!")
});

// Setup express
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


// Routing /////////////////////////////////////

// General
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Vote
app.get('/submit', vote.submit);

app.post('/submitEntry', vote.submitEntry);


// END Routing ////////////////////////////////


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
});