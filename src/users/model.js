const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    index: true,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user", "visitor"],
    required: true,
    default: "visitor"
  }
});

const userTeam = new Schema({
  name: {
    type: String,
    required: true
  }
});


const User = mongoose.model("User", userSchema);
const UserTeam = mongoose.model("UserTeam", userTeam);

module.exports = User, UserTeam;