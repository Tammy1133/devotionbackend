const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  plan: { type: String, default: "free" },
  token: { type: String },
  loginToken: { type: String },
});

const userModel = mongoose.model("footballusers", userSchema);
module.exports = userModel;
