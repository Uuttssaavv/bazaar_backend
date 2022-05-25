import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
  id: Number,
  title: String,
  images: [{ type: String }],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },

  phone: String,
  email: String,
  facebook_page: String,
  whatsapp_number: String,
  user: {
    ref: `user`,
    type: mongoose.Schema.Types.ObjectId,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
});

const BusinessModel = mongoose.model("post", BusinessSchema, "post");
export default BusinessModel;
