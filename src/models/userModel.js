import mongoose from "mongoose";
import AddressModel from "./addressModel.js";

const UserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: [true, "Email can't be blank"],
    match: [/\S+@\S+\.\S+/, "Invalid email "],
    unique: [true, "Email already in use."],
  },
  name: String,
  token: String,
  password: {
    type: String,
    minlength: [8, "Password cannot be less than 8 characters"],
    required: [true, "Password can't be blank"],
    select: false,
  },

  resresh_token: String,
  image_url: String,
  phone: {
    type: String,
    validate: {
      validator: function (val) {
        return val.toString().length === 10;
      },
      message: "Invalid phone number.",
    },
    required: [true, "Phone number can't be blank"],
    unique: [true, "Phone already in use."],
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
});
UserSchema.methods.getAddress = async (user) => {
  const address = await AddressModel.findOne({ _id: this.address._id }, "-__v");
  user.address = address;
  return user;
};

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
