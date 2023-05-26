const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String, required: true },
  programs: { type: mongoose.Types.ObjectId, required: true, ref: 'Program' }
});

module.exports = mongoose.model("User", userSchema);