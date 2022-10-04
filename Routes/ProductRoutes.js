const express = require("express");
const { getProducts } = require("../src/controllers/ProductsController");

const router = express.Router();

router.get("/", getProducts);

module.exports = router;
