const express = require("express");
const productsController = require("../controllers/productsController");

const router = express.Router();

// handle root url request
router.get("/", productsController.getProducts);

module.exports = router;
