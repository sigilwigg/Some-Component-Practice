// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
var express = require('express');
var router = express.Router();

// ----- local files -----
const User = require('../models/User');


// ========== [///// ROUTES /////] ==========
// ----- GET by id -----
router.get('/:id', async function (req, res, next) {
    try {
        const user = await User.get(req.params.id);
        return res.json(user);
    } catch (err) {
        return next(err);
    }
});

// ----- GET all -----
router.get('/', async function (req, res, next) {
    try {
        let users = await User.getAll();
        return res.json(users);
    } catch (err) {
        return next(err);
    }
});

// ----- UPDATE by id -----
router.patch('/:id', async function (req, res, next) {
    try {
        const user = req.body;
        const updatedNotesGroup = await User.update(user, req.params.id)
        return res.json(updatedNotesGroup);
    } catch (err) {
        return next(err);
    }
});

// ----- DELETE by id -----
router.delete('/:id', async function (req, res, next) {
    try {
        const response = await User.remove(req.params.id);
        res.status(204);
        return res.json(response);
    } catch (err) {
        return next(err);
    }
});


// ========== [///// EXPORTS /////] ==========
module.exports = router;