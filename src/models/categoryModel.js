import mongoose from "mongoose";
import { Schema } from "mongoose";

const CategorySchema = Schema({
  id: Number,
  title: String,
  slug: String,
  image: String,
});

const CategoryModel = mongoose.model("category", CategorySchema, "category");
export default CategoryModel;
