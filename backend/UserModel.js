const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  region: {
    type: String,
  },
  resetLink: {
    data: String,
    default: "",
  },
});

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("يرجى تعبئة المطلوب!");
  }

  const user = await this.findOne({ email });
  const match = await bcrypt.compare(password, user.password);

  if (!match || !user) {
    throw Error(
      "البريد الإلكتروني، أو كلمة المرور خاطئة، يرجى المحاولة مجددا!"
    );
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
