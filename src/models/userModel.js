import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  name: String,
  password: {
    type: String,
    select: false,
  },
  token: String,
  resresh_token: String,
  image_url: String,
  phone: { type: String, required: true },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
