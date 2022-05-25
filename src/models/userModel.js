import mongoose from "mongoose";
const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  token: String,
});
const Blog = mongoose.model("Blog", BlogSchema, "Blogs");
export default Blog;
