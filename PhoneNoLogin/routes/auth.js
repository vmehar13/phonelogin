var express = require('express');
var router = express.Router();
const { signup, signin, isSignedIn, isAdmin, isAuthenticated } = require('../controllers/auth');

const { body, validationResult } = require('express-validator');
// const { getUserById } = require('../controllers/user');

//params
router.param("userId", (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "No user found in DB"
            })
        }
        req.profile = user;
        next();
    });
});

//Actual Routes

router.post("/signup/:userId", [
    body('name', "minimum lenth atlest 3 characters").isLength({min: 3}),
    body('phone', "phoneNo. is requried").isLength({min: 10}) ,
    body('password', "password should be minimum length of 3").isLength({min: 3}), 
    ], isSignedIn, isAuthenticated, isAdmin, signup)


router.post("/signin",[
    body('phone', "phoneNo. is requried").isLength({min: 10}) ,
    body('password', "password should be minimum length of 3").isLength({min: 3}), 
], signin)


module.exports = router;