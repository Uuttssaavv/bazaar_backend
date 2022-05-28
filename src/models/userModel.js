import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: [true, "Email can't be blank"],
    match: [/\S+@\S+\.\S+/, "Invalid email "],
    unique: true,
  },
  name: String,
  password: {
    type: String,
    required: [true, "Password can't be blank"],
    select: false,
  },
  token: {
    type: String,
    required: [true, "Token can't be blank"],
    unique: true,
  },
  resresh_token: String,
  image_url: String,
  phone: {
    type: String,
    required: [true, "Phone number can't be blank"],
    unique: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
});
UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
