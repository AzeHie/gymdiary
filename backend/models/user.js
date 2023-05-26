const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  profilepicture: { type: String, required: true },
  programs: { type: mongoose.Types.ObjectId, required: true, ref: 'Program' }
});

module.exports = mongoose.model("User", userSchema);