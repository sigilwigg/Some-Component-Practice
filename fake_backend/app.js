// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
const express = require('express');
const cors = require('cors');

// ----- local files -----
const auth = require('./routes/auth');
const noteGroups = require('./routes/noteGroups');
const music = require('./routes/musics');
const users = require('./routes/users');
const { NotFoundError } = require("./expressError");


// ========== [///// CONFIG /////] ==========
const app = express();
app.use(cors());


// ========== [///// ROUTES /////] ==========
app.use('/auth', auth);
app.use('/note-groups', noteGroups);
app.use('/music', music);
app.use('/users', users);


// ========== [///// ERROR HANDLING /////] ==========
// ----- 404 Errors -----
app.use(function (req, res, next) {
    return next(new NotFoundError())
});

// ----- Generic Errors -----
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    return res.json({
        message: err.message,
        error: err
    });
});


// ========== [///// INITIALIZE SERVER /////] ==========
// ----- Server Config -----
app.set('port', process.env.PORT || 3001);

// ----- Start Server -----
const server = app.listen(app.get('port'), function () {
    console.log('Express server listening on http://localhost:%d', server.address().port);
});