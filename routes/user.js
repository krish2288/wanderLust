const express =require("express");
const router =express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}  = require("../middleware.js");
const userController=require("../controller/users.js");
//signup
router.get("/signup",userController.rendersignupform);

router.post("/signup",wrapAsync(userController.signupUser));

//login
router.get("/login",userController.renderloginform);

router.post(
    "/login", 
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    }),userController.loginUser
    );

//logout
router.get("/logout",userController.logoutUser);


module.exports =router;