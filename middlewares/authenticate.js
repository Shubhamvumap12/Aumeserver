const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (token) => {
  // console.log(process.env.JWT_KEY);
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  console.log(req.headers);
  if (!req.headers.authorization)
    return res
      .status(400)
      .send({ message: "Authorization token not found " });


  if (!req.headers.authorization.startsWith("Bearer "))
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });

  const token = req.headers.authorization.trim().split(" ")[1];
  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });
  }

  console.log(decoded);

  req.user = decoded.user;
  
  return next();
};

module.exports = authenticate;
