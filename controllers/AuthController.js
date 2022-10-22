const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const otpGenerator = require('otp-generator')

require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_KEY);
};

const register = async (req, res) => {
  try {
    console.log("users");
    console.log(req.body)
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }
    console.log(user);
    user = await User.create(req.body)
    // .populate({
    //   path: "cart.items.productId",
    // });
    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const login = async (req, res) => {
  try {
    let user =
      (await User.findOne({ email: req.body.email }).populate({
        path: "cart.items.productId",
      })) ||
      (await User.findOne({ phone: req.body.email }).populate({
        path: "cart.items.productId",
      }));
    console.log(user);

    if (!user) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }

    const match = user.checkPassword(req.body.password);

    if (!match) {
      return res.status(400).send({ message: "Wrong Email or PassWord" });
    }

    const token = generateToken(user);

    return res.status(200).send({ user, token });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const sendOtp = async (req, res) => {
    try {
      const { phone } = req.body;

      if ( phone.length != 10) {
        throw Error("Enter Valid Phone Number");
      } else {
        const user = User.findOne({phone: phone})
        if(user){
          return res.status(400).send({error: "user already exists"});
        }
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets : false });
        console.log(otp);
        client.messages
        .create({
          body: 'Otp from Aume Home: '+ otp,
          from: '++12138163583',
          to: '+91'+phone
        })
        .then(message => console.log("message", message.sid));

        res.status(200).send({otp})
      }
    } catch (err) {
      let error = err.message;
      res.status(400).json({ error: error });
    }
  }


module.exports = { register, login, sendOtp };
