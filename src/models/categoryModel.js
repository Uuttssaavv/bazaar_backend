import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  id: Number,
  title: String,
  slug: String,
  image: String,
});

const CategoryModel = mongoose.model("category", CategorySchema, "category");
export default CategoryModel;
