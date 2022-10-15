const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Product = require("./ProductsModel");

// creating UserSchema :-
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true, nullable: true},
    password: { type: String, required: true },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            ref: "product",
            required: true,
          },
          qty: {
            type: Number,
            required: false,
          },
        },
      ],
      totalPrice: { type: Number, required: false },
    },
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compareSync(new String(password).trim(), this.password);
};

// addttocart method
userSchema.methods.addToCart = async function (productId) {
  const product = await Product.findById(new String(productId).trim());
  if (product) {
    const cart = this.cart;
    const isExisting = cart.items.findIndex(
      (objInItems) =>
        new String(objInItems.productId).trim() ===
          new String(product._id).trim() ||
        new String(objInItems.productId._id).trim() ===
          new String(product._id).trim()
    );
    console.log(isExisting);
    if (isExisting >= 0) {
      cart.items[isExisting].qty += 1;
    } else {
      cart.items.push({ productId: product._id, qty: 1 });
    }
    if (!cart.totalPrice) {
      cart.totalPrice = 0;
    }
    cart.totalPrice += product.price;
    return this.save();
  }
};

// reduce the quantity of item by 1

userSchema.methods.removeCartItem = async function (productId) {
  const product = await Product.findById(new String(productId).trim());
  if (product) {
    const cart = this.cart;
    const isExisting = cart.items.findIndex(
      (objInItems) =>
        new String(objInItems.productId).trim() ===
          new String(product._id).trim() ||
        new String(objInItems.productId._id).trim() ===
          new String(product._id).trim()
    );
    if (cart.items[isExisting].qty > 1) {
      cart.items[isExisting].qty -= 1;
      cart.totalPrice -= product.price;
    } else {
      cart.totalPrice -= product.price;
      cart.items.splice(isExisting, 1);
    }
    return this.save();
  }
};

// cart item delete methode

// userSchema.methods.deleteCartItem = async function (productId) {
//   const product = await Product.findById(productId);
//   if (product) {
//     const cart = this.cart;
//     const isExisting = cart.items.findIndex(
//       (objInItems) =>
//         new String(objInItems.productId).trim() ===
//           new String(product._id).trim() ||
//         new String(objInItems.productId._id).trim() ===
//           new String(product._id).trim()
//     );

//     cart.totalPrice -= product.price * cart.items[isExisting].qty;
//     cart.items.splice(isExisting, 1);

//     return this.save();
//   }
// };

// cart item removal due to checkout

userSchema.methods.checkOut = async function () {
  let cart = this.cart;
  cart.items.splice(0, cart.items.length);
  cart.totalPrice = 0;
  return this.save();
};

const User = mongoose.model("user", userSchema);
module.exports = User;
