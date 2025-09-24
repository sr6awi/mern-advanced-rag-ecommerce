const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoryEntrySchema = new Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model("Category", categoryEntrySchema);
