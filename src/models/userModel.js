import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: String,
  name: String,
  password: { type: String, select: false },
  token: String,
  resresh_token: String,
  image_url: String,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
  phone: String,
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
