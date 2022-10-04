const express = require("express");
const cors = require("cors");
const ProductController = require("./controllers/ProductsController");
const CartController = require("./controllers/CartController");
const { register, login } = require("./controllers/AuthController");
const productRoutes = require("../Routes/ProductRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", register);
app.post("/login", login);

app.get("", (req, res) => {
  try {
    return res.send("Welcome to Aume");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/v1/product", productRoutes);
app.use("/cart", CartController);

module.exports = app;
