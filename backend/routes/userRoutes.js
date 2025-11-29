const express = require('express');
const {registerUser, authUser, updateUserProfile } = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);                //for registering user
router.route("/login").post(authUser);               //for login
router.route("/profile").post(protect, updateUserProfile); //for updating user profile

module.exports = router;