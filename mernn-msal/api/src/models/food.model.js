// src/models/food.model.js
const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    calories: { type: Number, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", FoodSchema);
