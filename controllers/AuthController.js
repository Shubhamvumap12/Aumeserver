const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const otpGenerator = require("otp-generator");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_KEY);
};

const register = async (req, res) => {
  try {
    console.log("users");
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }
    console.log(user);
    user = await User.create(req.body);
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
    const del = await User.find();
    console.log(del);

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
    let { phone, email } = req.body;
    
    if (phone.length != 10) {
      throw Error("Enter Valid Phone Number");
    } else {
      const user = await User.findOne({ phone: phone }) || await User.findOne({ email: email });
      if(user && phone!== "7300600393" && email!== "varsha.khokhar@applore.in"){
        return res.status(400).send({error: "user already exists"});
      }
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);
      console.log(accountSid);
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
        lowerCaseAlphabets: false,
      });
      if (phone !== "") {
        client.messages
          .create({
            body: `Verification Code For Aume Home :${otp}`,
            messagingServiceSid: "MG8615f99b096050b894bd6a9d1cda034b",
            to: "+91"+ phone,
          })
          .then((message) => console.log("message sent", message.sid))
          .done();
      }
      // console.log(process.env.SENDGRID_API_KEY)

      if (email !== "") {
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: email, // Change to your recipient
          from: "vinay.chopra@applore.in", // Change to your verified sender
          subject: "Aume homes: New Login detected",
          text: otp,
          html: ` <p> Verification Code For Aume Home :  <strong>${otp}</strong> </p>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      }
      res.status(200).send({ otp });
    }
  } catch (err) {
    let error = err.message;
    res.status(400).json({ error: error });
  }
};

const verifyOtp = async (req, res) => {
  // errorValidation(req, res);
  try {
    let { phone, otpValue } = req.body;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    if (phone.length != 10) {
      throw Error("Enter Valid Phone Number");
    } else {
      // const user = await AllEmployee.findOne({ phone }).populate("companyAdminId");
      // console.log(user);
      // if (user) {
      // logger.info("USER FOUND: " + user);

      phone = "+91" + phone;

      client.verify
        .services(accountSid)
        .verificationChecks.create({ to: phone, code: otpValue })
        .then(async (verification_check) => {
          console.log("verification_check : ", verification_check);
          if (verification_check.status == "approved") {
            // logger.info("Otp Verified");
            // const token = await createToken(user);
            res.status(200).json({ message: "Otp Verified Successfully" });
          } else {
            // logger.error("Invalid Otp:" + verification_check.status);
            res.status(400).json({ error: "Invalid Mobile Otp Value" });
          }
        })
        .catch((err) => {
          // logger.error(err);
          res.status(400).json({ error: "Something went wrong Try again" });
        });
      // }
    }
  } catch (err) {
    // logger.error(err);
    let error = err.message;
    res.status(400).json({ error: error });
  }
};

module.exports = { register, login, sendOtp, verifyOtp };
