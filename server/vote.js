const mongoose = require('mongoose');
const Entry = mongoose.model('Entries');
const EntryQueue = mongoose.model('EntryQueue');
const Artist = mongoose.model('Artists');
const Contest = mongoose.model('Contests');

exports.submit = (req, res) => {
    res.send('==Submitted vote!==')
}  

/* 'req' will contain an Artist, Track, and Link object that it will use to create
 *  an Entry in the MongoDB. 
 *  This method should create an Entry and add it to the EntryQueue. 
 *  It should also create an Artist entity if one does not exist. */
exports.submitEntry = (req, res) => {
    let data = req.body;
    console.log(data);
    if(!data) {
        res.console.error("Invalid object sent to '/submitEntry'");
    }
    if(!data.artist || !data.track || !data.link) {
        res.console.error("Data sent to '/submitEntry' missing necessary argument");
    }
    

    // Create necessary IDs and item data
    var artistIdRegex = /soundcloud\.com\/([\w-]+)\/([\w-]+)/gm;
    var m = artistIdRegex.exec(data.link);
    var artistId = m[1];
    var trackSCId = m[2];                               // Soundcloud track id will never be repeated PER artist
    var trackObjId = mongoose.Types.ObjectId();
    var trackId = trackSCId + trackObjId.toHexString(); // unique track id - will never be repeated
    var entryId = artistId + trackSCId;
    var entryName = data.artist + " - " + data.track;
    var entrySubmitted = new Date();
    var newTrack = { id: trackId, titleId: trackSCId, title: data.track, fullName: entryId, link: data.link, active: false, submitted: entrySubmitted };
    data.artistId = artistId;
    data.trackId = trackId;
    data.entryId = entryId;
    data.entryName = entryName;
    data.submittedDate = entrySubmitted;
    data.newTrack = newTrack;


    const dbSubmit = handleDbSubmission(data);


    res.send('==Submitted entry!==');
}

/**
 * This asynchronous function will:
 *  1. Check that the entryId does not exist (artist+track). If it does, return error. 
 *  2. Add new Entry
 *  3. Add the new Entry to the EntryQueue
 *  4. Upsert new track to the Artist (and create new Artist if needed)
 * @param {Object holding all info needed to create Entry, Artist, and EntryQueue documents} data 
 */
async function handleDbSubmission(data) {
    // Check that the entryId does not exist already
    const foundEntry = await Entry.findById(data.entryObjId);
    console.log(foundEntry);
    if (foundEntry === null || foundEntry === undefined || foundEntry.length == 0) {
        // Upsert artist
        console.log("UPSERTING ARTIST ===");
        const upsertedArtist = await upsertArtist(data.artistId, data.artist, data.newTrack);
        console.log(upsertedArtist);
        // Create Entry
        console.log("CREATING NEW ENTRY ===");
        const createdEntry = await createEntry(data.entryId, data.entryName, upsertedArtist, data.submittedDate);
        console.log(createdEntry);
        // Add Entry to EntryQueue
        console.log("ADDING ENTRY TO QUEUE ===");
        const entryQueueObj = await addEntryToQueue(data.entryId, data.submittedDate);
        console.log(entryQueueObj);

        console.log("FINISHED ===");
        // TODO: return true and process new submission
    } else {
        console.log("ENTRY ALREADY EXISTS ===");
        // TODO: return false and display error message on submitEntryForm
    }
    return true;
}

/**
 * Will insert or update an artist depending on whether the artist and the submitted track exist.
 * @param {*} artistId - Artist ID, based off Soundcloud ID. (i.e. 'tio574')
 * @param {*} artist - (Stylized) Artist name, based off user input form (i.e. 'Tio Benito')
 * @param {*} newTrack - JSON object representing the new track to be added. Track titleId must not already exist
 */
async function upsertArtist(artistId, artist, newTrack) {
    console.log("--- Trying to find track: " + newTrack.title)
    var findTrack = { _id: artistId, tracks: { $elemMatch: { titleId: newTrack.titleId } } };
    const foundTrack = await Artist.find(findTrack);
    if (foundTrack === undefined || foundTrack.length == 0) {
        console.log("---- Did not find track. Upserting.")
        const upserted = await Artist.findOneAndUpdate(
            { _id: artistId }, 
            {
                $setOnInsert: { 
                    name: artist, 
                    wins: 0, 
                    active: false, 
                    totalVotes: 0
                },
                $push: { tracks: newTrack }
            },
            { upsert: true }
        );
    } else {
        console.log("---- Found track. Do nothing.")
    }
    const arti = await Artist.findById(artistId);
    // console.log(arti);
    return arti;
}

async function createEntry(entryId, entryName, artistObj, date) {
    // TODO: Do not add an entry if entryId exists in the Entry model
    console.log("--- Trying to find entry: " + entryId)
    const foundEntry = await Entry.findById(entryId);
    if(foundEntry === null || foundEntry === undefined || foundEntry.length === 0) {
        console.log("---- Did not find entry. Insert.")
        const entry = new Entry({
            _id: entryId,
            name: entryName,
            contest: '',
            votes: 0,
            artist: artistObj,
            active: false,
            winner: false,
            date_submitted: date
        });
        console.log("----- Trying to save: " + entry._id);
        const saved = entry.save();
        console.log(saved);
        // await entry.save(function(err, obj) {
        //     if (err) return handleError(err);
        //     // console.log("------ Added new entry obj: ");
        //     // console.log(obj);
        // });
        const ent = await Entry.findById(entryId);
        // console.log(ent);
        return ent;
    } else {
        console.log("---- Found entry. Do nothing.")
        console.log(foundEntry[0]);
        return foundEntry[0];
    }
    
}

async function addEntryToQueue(entryId, date) {

    var entryQueueId = mongoose.Types.ObjectId();
    const entryQueueObj = new EntryQueue({
        _id: entryQueueId,
        entry: entryId,
        submitted: date
    });
    entryQueueObj.save(function(err, obj) {
        if (err) return handleError(err);
        // console.log("Added new EntryQueue obj: ");
        // console.log(obj);
    });
    const entQ = await EntryQueue.findById(entryQueueId);
    // console.log(entQ);
    return entQ;
}


function handleError(error) {
    console.error("MongoDB Error");
    console.error(error);
}