const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const authenticate = require("../middlewre/authenticate");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

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
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        return res.status(400).json({
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

// About us page

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

//Get user data for contact us & Home page

router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

//Post messgage of contact page to database

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("Plzz fill all the fields");
      return res.status(401).json({
        error: "plzz filled the contact form",
      });
    }
    const userContact = await User.findOne({ _id: req.userID });
    // console.log(userContact);
    // console.log(req.userID);

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({
        message: "Message added successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Logout page

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(201).json({
    message: "user logged out",
  });
});

module.exports = router;
