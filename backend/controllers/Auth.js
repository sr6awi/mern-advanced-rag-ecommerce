const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/JwtManager");

const cleanUserData = (user) => {
  if (!user) return null;
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
};

// Register new account
exports.registerNewUser = async (req, res) => {
  try {
    const existing = await UserModel.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel(req.body);
    await newUser.save();

    const payload = cleanUserData(newUser);
    const token = generateToken(payload);

    res.cookie("token", token, {
      sameSite: process.env.PRODUCTION === "true" ? "None" : "Lax",
      maxAge: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRATION_DAYS) * 86400000),
      httpOnly: true,
      secure: process.env.PRODUCTION === "true",
    });

    res.status(201).json(payload);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed. Try again later." });
  }
};

// Login handler
exports.authenticateUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    const isValid = user && (await bcrypt.compare(req.body.password, user.password));

    if (isValid) {
      const token = generateToken(cleanUserData(user));

      res.cookie("token", token, {
        sameSite: process.env.PRODUCTION === "true" ? "None" : "Lax",
        maxAge: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRATION_DAYS) * 86400000),
        httpOnly: true,
        secure: process.env.PRODUCTION === "true",
      });

      return res.status(200).json(cleanUserData(user));
    }

    res.clearCookie("token");
    res.status(404).json({ message: "Incorrect email or password." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login error occurred." });
  }
};

// Logout handler
exports.logoutSession = async (req, res) => {
  try {
    res.cookie("token", {
      maxAge: 0,
      sameSite: process.env.PRODUCTION === "true" ? "None" : "Lax",
      httpOnly: true,
      secure: process.env.PRODUCTION === "true",
    });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (err) {
    console.log(err);
  }
};

// Validate current session/token
exports.checkSessionValidity = async (req, res) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.sendStatus(401);
    }

    return res.status(200).json(cleanUserData(user));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

