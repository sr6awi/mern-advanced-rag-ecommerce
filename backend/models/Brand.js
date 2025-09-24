const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandEntrySchema = new Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model("Brand", brandEntrySchema);
