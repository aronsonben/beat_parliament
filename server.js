const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const vote = require('./server/vote');


module.exports = app;

app.use(bodyParser.json());

// General
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Vote
app.get('/submit', vote.submit);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
});