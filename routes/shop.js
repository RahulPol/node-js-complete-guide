const path = require("path");
const express = require("express");

const rootDir = require("../util/util");

const router = express.Router();

// handle root url request
router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
