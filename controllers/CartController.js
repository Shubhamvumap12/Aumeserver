const express = require("express");
const User = require("../models/UserModel");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/getcart", authenticate, async (req, res) => {
  try {
    let cartItems = await User.findById(req.user._id).populate({
      path: "cart.items.productId",
    });
    return res.status(200).send(cartItems);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/add/:id", authenticate, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    await user.addToCart(req.params.id);
    await user.populate({
      path: "cart.items.productId",
    });
    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.post("/remove/:id", authenticate, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    await user.removeCartItem(req.params.id);
    await user.populate({
      path: "cart.items.productId",
    });
    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.post("/delete/:id", authenticate, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    await user.deleteCartItem(req.params.id);
    await user.populate({
      path: "cart.items.productId",
    });
    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/removeall", authenticate, async (req, res) => {
  try {
    let user = await User.findById(req.user._id).populate({
      path: "cart.items.productId",
    });
    await user.checkOut();
    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
