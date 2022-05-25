import mongoose from "mongoose";
var addressSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  province: String,
  district: String,
  area: String,
  latitude: String,
  longitude: String,
  zip_code: Number,
  market: {
    type: String,
  },
});
const AddressModel = mongoose.model("address", addressSchema);
export default AddressModel;
