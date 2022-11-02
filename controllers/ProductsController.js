const express = require("express");
const Product = require("../models/ProductsModel");
const User = require("../models/UserModel");
const router = express.Router();

const someFunction = async (req, res) => {
  try {
    const ProductsData = await Product.find().lean().exec();
    return res.status(200).json({ProductsData});
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({error: err.message});
  }
};

const addProduct = async (req, res) => {
    try {
    console.log(req.user)
    const ProductsData = await Product.create({...req.body, uploaded_by: req.user._id });
    return res.status(200).json({data: ProductsData});
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({error: err.message});
  }
}

const getProduct = async (req, res) => {
  try {
    const ProductData = await Product.findById(req.params.id).lean().exec();
    return res.status(200).send({ Product: ProductData });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
const getProducts = async (req, res) => {
  try {
    console.log(req.body);
    let filters = [];
    console.log(typeof req.body.filter.price)
    Object.keys(req.body.filter).map((key)=>{
      if(typeof req.body.filter[key]!== 'string' && req.body.filter[key].length > 0)
      filters.push( {[key] : {$in: req.body.filter[key]}} )
    })
   
    Object.keys(filters).map((key)=>{
      console.log(key, filters[key])
    })
    if (filters.length == 0) {
      filters = [{ own_type: { $in: ["Buy", "Rent"] } }];
    }
    filters.push({price: {$lte: req.body.filter.price}})

    const sort = req.body.sort;
    console.log({filters});

    
    // await Product.updateMany({}, {$set: {property_type : 'residential'}})
    let ProductsData = await Product.find({$and: filters}).sort(sort);
    return res.status(200).send(ProductsData);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
};


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


module.exports = {getProducts, addProduct, getProduct };

// module.exports = exports;
