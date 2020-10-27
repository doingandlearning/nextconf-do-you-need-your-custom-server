const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
      required: false
    }
  },
  { timestamps: true, strict: true },
);

let User

try {
  User = mongoose.model('User')
} catch {
  User = mongoose.model('User', userSchema);
}

module.exports = User;