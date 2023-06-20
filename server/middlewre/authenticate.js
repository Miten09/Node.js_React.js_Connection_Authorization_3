const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found!");
    }
    (req.token = token), (req.rootUser = rootUser);
    req.userID = rootUser._id;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authenticate;