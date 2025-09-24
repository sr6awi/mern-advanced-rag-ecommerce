const mongoose = require("mongoose");
const { Schema } = mongoose;

const userAccountSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userAccountSchema);
