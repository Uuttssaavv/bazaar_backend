import BusinessModel from "../models/postModel.js";
import AddressModel from "../models/addressModel.js";
class PostController {
  async getPost(req, res) {
    var categories = await BusinessModel.find({
      _id: req.query.id,
    }).populate(["user", "category"]);
    res.send({ success: true, data: categories });
  }
  async getAllPost(req, res) {
    var categories = await BusinessModel.find().populate("category");
    res.send({ success: true, data: categories, user: req.user });
  }
  async getPostPerCategory(req, res) {
    const category = req.query;
    console.log(category);
    var categories = await BusinessModel.find({
      category: { _id: category.category_id },
    }).populate(["category", "address"]);
    res.send({
      success: true,
      data: categories,
      user: req.user,
    });
  }
  async createPost(req, res) {
    //62c162e914ec36578c1061a4
    const { title, phone, email, category_id, address, user } = req.body;
    const addressModel = new AddressModel(address);

    const post = new BusinessModel({
      user: user._id,
      category: category_id,
      title: title,
      phone: phone,
      email: email,
    });
    post.address = await addressModel.save();

    var posts = await post.save();
    res.send({ success: true, data: posts });
  }
  async updatePost(req, res) {
    const { title, phone, email, id, address, user, category_id } = req.body;

    try {
      var newAdd;
      if (address.id) {
        newAdd = await AddressModel.findByIdAndUpdate(address.id, address);
      } else {
        newAdd = await AddressModel(address).save();
      }
      const data = {
        category: category_id,
        title: title,
        phone: phone,
        email: email,
        address: newAdd,
        updatedAt: Date.now(),
      };

      const val = await BusinessModel.findByIdAndUpdate(id, data, {
        upsert: true,
      });
      const business = await BusinessModel.findOne({ _id: id }).populate([
        "category",
        "address",
        "user",
      ]);
      res.send({
        success: true,
        message: "Post updated successfully",
        data: business,
      });
    } catch (error) {
      res.send({
        success: false,
        error: `${error}`,
        message: "Unable to update " + id,
      });
    }
  }
}

export default PostController;
