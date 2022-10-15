const express = require("express");
const { getProducts, addProduct, getProduct } = require("../controllers/ProductsController");
const authenticate = require("../middlewares/authenticate")
const router = express.Router();

router.post("/", getProducts);
router.post("/add", authenticate, addProduct );
router.get("/:id", getProduct );


module.exports = router;
