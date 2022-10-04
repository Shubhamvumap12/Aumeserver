const express = require("express");
const Product = require("../models/ProductsModel");
const User = require("../models/UserModel");
const router = express.Router();

exports.someFunction = async (req, res) => {
  try {
    const ProductsData = await Product.find().lean().exec();
    return res.status(200).send(ProductsData);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
};

// router.post("", async (req, res) => {
//   try {
//     const ProductsData = await Product.create(req.body);
//     return res.status(200).send(ProductsData);
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).send(err.message);
//   }
// });

// router.get("/product/:id", async (req, res) => {
//   try {
//     const ProductData = await Product.findById(req.params.id).lean().exec();
//     return res.status(200).send({ Product: ProductData });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

// router.get("/:page", async (req, res) => {
//   try {
//     const ProductsData = await Product.find({ page: req.params.page })
//       .lean()
//       .exec();
//     return res.status(200).send(ProductsData);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// router.get("/search/:key", async (req, res) => {
//   try {
//     function capitalize(string) {
//       return string.toUpperCase();
//     }
//     let result = capitalize(req.params.key);

//     const searchedProducts = await Product.find({
//       $or: [{ name: { $regex: result } }, { tag: { $regex: result } }],
//     })
//       .lean()
//       .exec();
//     return res.status(200).send(searchedProducts);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// const getProducts = async (req, res) => {
//   try {
//     const ProductsData = await Product.find().lean().exec();
//     return res.status(200).send(ProductsData);
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).send(err.message);
//   }
// };

exports.getProducts = async (req, res) => {
  try {
    const ProductsData = await Product.find().lean().exec();
    return res.status(200).send(ProductsData);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
};

// module.exports = {getProducts, someFunction};

// module.exports = router;
