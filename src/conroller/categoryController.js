import CategoryModel from "../models/categoryModel.js";
class CategoryController {
  async createCategory(req, res) {
    const { title, slug, image } = req.body;
    const category = new CategoryModel({
      title: title,
      slug: slug,
      image: image,
    });
    var cat = await category.save();
    if (cat) {
      res.send({ success: true, data: cat });
    } else {
      res.send({ success: false, message: "Cannot create category" });
    }
  }
  async getAllCategories(req, res) {
    var categories = await CategoryModel.find();
    res.send({ success: true, data: categories });
  }
}
export default CategoryController;
