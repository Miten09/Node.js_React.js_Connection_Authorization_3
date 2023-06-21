const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    // console.log(token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(verifyToken);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    // console.log(rootUser);

    if (!rootUser) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    (req.token = token), (req.rootUser = rootUser);
    req.userID = rootUser._id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized:No token provided",
    });
    console.log("No token provided");
  }
};

module.exports = authenticate;
