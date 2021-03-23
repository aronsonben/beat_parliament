const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Import models (once created)
require('./server/models/Contest');
require('./server/models/Entry');
require('./server/models/EntryQueue');
require('./server/models/Artist');

module.exports = app;

// Setup MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/beatParliament', {useNewUrlParser: true});



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(db.host + db.port);
    console.log("================================");
    console.log("Connected to " + db.name + "!");
    console.log("================================");
    // Collection info
    let collectionStr = "[";
    for(let coll in db.collections) {
        collectionStr = collectionStr + coll + ", "
    }
    collectionStr = collectionStr.substring(0, collectionStr.length-3) + "]";
    console.log("Current collections: " + collectionStr);
    console.log("================================");
    // Models info
    const modelNames = db.modelNames();
    // console.log(modelNames);
    console.log("Models (counts): ");
    for(let model in db.models) {
        var dbModel = db.model(model);
        dbModel.estimatedDocumentCount({}, function(err, count) {
            if (err) return;
            console.log(model + " (" + count + ")");
        }).then(function() {
            console.log("================================");
        });
    }
    console.log("----------------");
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);



const Contest = mongoose.model("Contests");
Contest.find().then((obj) => {
    console.log(obj)
});



// Setup express
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// For production (later)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    }) 
}


////////////////////////////////////////////////
// Routing /////////////////////////////////////
////////////////////////////////////////////////


// Import //
const vote = require('./server/vote');
const admin = require('./server/admin');

// General
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/drop', (req, res) => {
    db.dropCollection('artists');
    db.dropCollection('entries');
    db.dropCollection('entryqueues');
    res.send("Dropped all collections (except Contest)");
});

// Vote
app.get('/submit', vote.submit);

// Submit Entry
app.post('/submitEntry', vote.submitEntry);

// Admin
app.get('/fetchEntryList', admin.fetchEntryList);
app.post('/addEntryToContest', admin.addEntryToContest);


////////////////////////////////////////////////
// END Routing /////////////////////////////////
////////////////////////////////////////////////

////////////////////////////////////////////////
// Set and open port for listening
////////////////////////////////////////////////
const PORT = process.env.BP_PORT || 6000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
});