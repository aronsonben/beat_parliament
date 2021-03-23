const mongoose = require('mongoose');
const Entry = mongoose.model('Entries');
const EntryQueue = mongoose.model('EntryQueue');
const Artist = mongoose.model('Artists');
const Contest = mongoose.model('Contests');


exports.fetchEntryList = async (req, res) => {
    console.log("==FETCHING ENTRY LIST==");
    let entryList = await Entry.find(function (err, docs) {
        if (err) res.status(500).send(err);
        console.log("--- Found Entries: ");
        console.log(docs);
    });
    res.status(200).send(entryList);
}

/**
 * Admin function to add the specified Entry to the current Contest, if there is a spot available.
 * Good for testing the correct functionality of Entry submission and EntryQueue reetrieval.
 */
exports.addEntryToContest = async (req, res) => {
    console.log("==ADDING ENTRY TO CONTEST==");
    var entry = req.body.entry;
    console.log(entry);
    if (!entry) {
        throw new Error("Entry not found!");
    } else {
        // TODO: Try to extract important Entry information; Check if Contest has an open spot; Insert;
        var activeContest = await Contest.findOne({ active: true}, function(err, obj) {
            if (err) console.log(err);
            if (obj.length > 1) console.log("--- ERROR: Grabbed too many Contests! ");
        });
        if (activeContest.entries !== undefined && activeContest.entries.length < activeContest.numEntries) {
            console.log("--- About to add entry to contest ---");
            // activeContest.entries.push(entry);
            console.log(entry);
            console.log(typeof entry._id)
            try {
                let upcon = await Contest.updateOne({ _id: activeContest._id }, { $push: { entries: entry._id } }, function(err,data) {
                    if(err) return handleError(err);
                    console.log(data);
                    return data;
                });
                console.log("Match: " + upcon.n)
                console.log("Modded: " + upcon.nModified)
            } catch (exception) {
                return handleError(exception);
            }
            
            // activeContest.save();
        } else {
            console.log("--- COuld not add entry to contest ---");
        }
        res.send('==Added Entry to Contest!==');
    }
}  


/* ========== Auxiliary Functions ========= */
function handleError(error) {
    console.error("!!!!! MongoDB Error !!!!!");
    console.error(error);
}