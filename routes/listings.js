const express = require("express");
const router = express.Router();
const {
  createListing,
  getListings,
} = require("../controllers/listingsController");

router.get("/get-listings", getListings);
router.post("/create-listing", createListing);

module.exports = router;
