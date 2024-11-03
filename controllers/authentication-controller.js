const User = require("../models/User");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/otp_generator");
const sendMail = require("../utils/send_mail");

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
      const otp = generateOtp();

      // create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        userType: "Client", // when the user create account the default gonna be a client
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET
        ).toString(),
        otp: otp,
      });

      //save the new create user to the db
      await newUser.save();

      //todo: send the email to user
      sendMail(newUser.email, otp);

      res.status(201).json({
        status: true,
        message:
          "Account created success! please check your email to active your account.",
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  login: async (req, res) => {
    const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!validEmail.test(req.body.email)) {
      return res
        .status(400)
        .json({ status: false, message: "Email is not valid" });
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
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        res.status(400).json({ status: false, message: "Invalid credentials" });
      }

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const depassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

      if (depassword !== req.body.password) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid credentials" });
      }

      const userToken = jwt.sign(
        {
          id: user._id,
          userType: user.userType,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const { password, createdAt, updatedAt, __v, otp, ...others } = user._doc;
      res.status(200).json({ ...others, userToken });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
