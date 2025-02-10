const express =require("express");
const router =express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing =require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controller/listing.js");
const multer=require("multer");
const{cloudinary,storage}=require("../cloudConfig.js");
const upload=multer({storage});


router.route("/")
.get(wrapAsync(listingController.index))
.post( isLoggedIn,
    // validateListing,
    upload.single('listing[image]'),
    wrapAsync(listingController.createLis))

//New Route
router.get("/new",isLoggedIn,listingController.new)

router.route("/:id")
.get(wrapAsync( listingController.show))
.put(isLoggedIn,
     isOwner,
     upload.single('listing[image]'),
     validateListing ,
     wrapAsync( listingController.updateLis))
.delete(isLoggedIn,
        isOwner,
        wrapAsync( listingController.deleteLis))


//edit
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync( listingController.editLis))


module.exports=router;