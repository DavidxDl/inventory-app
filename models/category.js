const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, min: [3, "too short name for a category"] },
});

categorySchema.virtual("url").get(function () {
  return `/catalog/categories/${this._id}`;
});

module.exports = mongoose.model("Category", categorySchema);
