const User = require("../models/User");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/otp_generator");

module.exports = {
  createUser: async (req, res) => {
    const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!validEmail.test(req.body.email)) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter a valid email." });
    }

    const minPasswordLength = 8;

    if (req.body.password < minPasswordLength) {
      return res.status(400).json({
        status: false,
        message:
          "Password should be at least " +
          minPasswordLength +
          " characters long",
      });
    }

    try {
      const emailExists = await User.findOne({ email: req.body.email });

      if (emailExists) {
        return res
          .status(400)
          .json({ status: false, message: "Email already exists" });
      }

      // generate Otp digit
      const get_otp = generateOtp();

      // create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        userType: "Client", // when the user create account the default gonna be a client
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET
        ).toString(),
        otp: get_otp,
      });

      //save the new create user to the db
      await newUser.save();

      //todo: send the email to user

      res.status(201).json({
        status: true,
        message:
          "Account created success! please check your email to active your account.",
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  login: async (req, res) => {},
};
