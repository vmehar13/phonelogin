const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

//params
// router.param("userId", getUserById);

//Actual Routes
// router.get("/user/:userId",isSignedIn,isAuthenticated, getUser);

module.exports = router;