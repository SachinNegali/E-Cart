
const express = require('express');
var router = express.Router();
const { check} = require("express-validator");
const { signup, signin, signout } = require('../controllers/auth');


router.post('/signup', [
    check("name", "name should be at least 4 char long").isLength({ min: 4 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 4 char long").isLength({ min: 6})
], signup)


router.post('/signin', [
    check("email", "email not valid").isEmail(),
    check("password", "password not valid").isLength({min: 6})
], signin)

router.get('/signout', signout)


module.exports = router;