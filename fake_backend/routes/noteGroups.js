// ========== [///// DEPENDENCIES /////] ==========
// ----- libraries -----
var express = require('express');
var router = express.Router();

// ----- local files -----
const NoteGroup = require('../models/NoteGroup');


// ========== [///// ROUTES /////] ==========
// ----- GET by id -----
router.get('/:id', async function (req, res, next) {
    try {
        const noteGroup = await NoteGroup.get(req.params.id);
        return res.json(noteGroup);
    } catch (err) {
        return next(err);
    }
});

// ----- GET all -----
router.get('/', async function (req, res, next) {
    try {
        let noteGroups = await NoteGroup.getAll();
        return res.json(noteGroups);
    } catch (err) {
        return next(err);
    }
});

// ----- UPDATE by id -----
router.patch('/:id', async function (req, res, next) {
    try {
        const noteGroup = req.body;
        const updatedNotesGroup = await NoteGroup.update(noteGroup, req.params.id)
        return res.json(updatedNotesGroup);
    } catch (err) {
        return next(err);
    }
});

// ----- DELETE by id -----
router.delete('/:id', async function (req, res, next) {
    try {
        const response = await NoteGroup.remove(req.params.id);
        res.status(204);
        return res.json(response);
    } catch (err) {
        return next(err);
    }
});

// ========== [///// EXPORTS /////] ==========
module.exports = router;