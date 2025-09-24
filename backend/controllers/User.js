const UserModel = require("../models/User");

// Get user by ID (excluding password)
exports.fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = (await UserModel.findById(id)).toObject();
    delete user.password;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not retrieve user data." });
  }
};

// Update user profile info
exports.updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = (await UserModel.findByIdAndUpdate(id, req.body, { new: true })).toObject();
    delete updated.password;
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User update failed." });
  }
};
