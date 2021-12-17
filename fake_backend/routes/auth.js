// ========== [///// DEPENDANCIES /////] ==========
// ----- libraries -----
var express = require('express');
var router = express.Router();

// ----- local files -----
const User = require('../models/User');
const { createToken } = require('../helpers/tokens');


// ========== [///// ROUTES /////] ==========
// ----- REGISTER new user -----
router.post('/register', async function (req, res, next) {
    try {
        let newUserData = req.body;
        let newUser = await User.register(newUserData);
        let id = newUser.id;
        let token = createToken(newUser);
        return res.json({ token, id })
    } catch (err) {
        return next(err);
    }
});

// ----- LOGIN user -----
router.post('/login', async function (req, res, next) {
    try {
        console.log(req.body)
        let { name, password } = req.body;
        let user = await User.authenticate(name, password);
        let id = user.id;
        let token = createToken(user);
        return res.json({ token, id })
    } catch (err) {
        return next(err);
    }
});


// ========== [///// EXPORTS /////] ==========
module.exports = router;