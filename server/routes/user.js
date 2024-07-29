const express= require("express");
const { createUser, Login, LoginByPassword, verifyOTP, signOut } = require("../controllers/user");
const { authenticateEmail } = require("../middlewares/authenticateUser");
const router= express.Router();

router.post("/signup", createUser);
router.post("/login",authenticateEmail,Login);
router.post("/loginbypassword",authenticateEmail, LoginByPassword);
router.get("/verifyotp/:otp", verifyOTP);
router.get("/signout/:id", signOut);

module.exports= router;