const path = require("path");
const express = require("express");

const rootDir = require("../util/util");
const adminData = require("./admin");

const router = express.Router();

// handle root url request
router.get("/", (req, res, next) => {
  res.render("shop");
});

module.exports = router;
