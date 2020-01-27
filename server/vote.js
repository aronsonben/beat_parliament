exports.submit = (req, res) => {
    res.send('==Submitted vote!==')
}  
/* 'req' will contain an Artist, Track, and Link object that it will use to create
 *  an Entry in the MongoDB. */
exports.submitEntry = (req, res) => {
    let data = req.body;
    console.log(data);
    if(!data) {
        res.console.error("Invalid object sent to '/submitEntry'");
    }
    if(!data.artist || !data.track || !data.link) {
        res.console.error("Data sent to '/submitEntry' missing necessary argument");
    }
    var artist = req.body.artist;
    var track = req.body.track;
    var link = req.body.link;
    res.send('==Submitted entry!==');
}