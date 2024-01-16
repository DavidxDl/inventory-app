const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eliquidSchema = new Schema({
  name: String,
  description: { type: String, min: [8, "the description is too short"] },
  category: { type: ObjectId, ref: "Category", required: true },
  price: {
    small: { type: Number, min: [1, "the minimum price is 1"] },
    medium: { type: Number, min: [1, "the minimum price is 1"] },
    large: { type: Number, min: [1, "the minimum price is 1"] },
  },
  number_in_stock: {
    small: { type: Number, min: [1, "the minimum price is 1"] },
    medium: { type: Number, min: [1, "the minimum price is 1"] },
    large: { type: Number, min: [1, "the minimum price is 1"] },
  },
});

eliquidSchema.virtual("url").get(function () {
  return `/catalog/eliquid/${this._id}`;
});

module.exports = mongoose.model("Eliquid", eliquidSchema);
