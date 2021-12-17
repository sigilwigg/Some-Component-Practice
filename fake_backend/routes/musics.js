// ========== [///// DEPENDENCIES /////] ==========
// ----- libraries -----
var express = require('express');
var router = express.Router();

// ----- local files -----
const Music = require('../models/Music');


// ========== [///// ROUTES /////] ==========
// ----- GET by id -----
router.get('/:id', async function (req, res, next) {
    try {
        const music = await Music.get(req.params.id);
        return res.json(music);
    } catch (err) {
        return next(err);
    }
});

// ----- GET all -----
router.get('/', async function (req, res, next) {
    try {
        let musics = await Music.getAll();
        return res.json(musics);
    } catch (err) {
        return next(err);
    }
});

// ----- UPDATE by id -----
router.patch('/:id', async function (req, res, next) {
    try {
        const music = req.body;
        const updatedNotesGroup = await Music.update(music, req.params.id)
        return res.json(updatedNotesGroup);
    } catch (err) {
        return next(err);
    }
});

// ----- DELETE by id -----
router.delete('/:id', async function (req, res, next) {
    try {
        const response = await Music.remove(req.params.id);
        res.status(204);
        return res.json(response);
    } catch (err) {
        return next(err);
    }
});

// ========== [///// EXPORTS /////] ==========
module.exports = router;