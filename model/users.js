const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  uname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  pass: {
    type: String,
  },
  gender: {
    type: String,
  },
});

// Password bcrypt

userSchema.pre("save", async function () {
  try {
    if (this.isModified("pass")) {
      this.pass = await bcrypt.hash(this.pass, 10);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = new mongoose.model("User", userSchema);
