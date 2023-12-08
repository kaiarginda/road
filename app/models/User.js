const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favourites: {
    type: [],
    default: [],
    required: true,
  },
  followers: {
    type: [],
    default: [],
    required: true,
  },
  following: {
    type: [],
    default: [],
    required: true,
  },
});
const User = mongoose.models?.User || mongoose.model("User", UserSchema);

module.exports = User;
