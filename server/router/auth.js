const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("Hello World from home page router ");
});

router.post("/register", async (req, res) => {
  const { name, email, password, cpassword, phone, work } = req.body;

  if (!name || !email || !password || !cpassword || !phone || !work) {
    return res.status(422).json({
      error: "Plz fill all the fields",
    });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({
        message: "Email already exists",
      });
    } else if (password !== cpassword) {
      return res.status(422).json({
        message: "password & confirm password are not same",
      });
    } else {
      const user = new User({ name, email, password, cpassword, phone, work });

      await user.save();

      res.status(201).json({
        message: "user registered successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        error: "Please fill all the fields",
      });
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        return res.status(422).json({
          error: "Invalid credentials",
        });
      } else {
        token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(200).json({
          message: "User login successfully",
        });
      }
    } else {
      res.status(200).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
