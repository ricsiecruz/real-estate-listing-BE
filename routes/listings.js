const express = require("express");
const router = express.Router();
const {
  createListing,
  getListings,
} = require("../controllers/listingsController");

router.get("/", getListings);
router.post("/", createListing);

module.exports = router;
