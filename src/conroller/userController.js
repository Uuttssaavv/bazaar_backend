//
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import AddressModel from "../models/addressModel.js";
class UserController {
  async createUser(req, res) {
    const { name, email, password, image_url, phone } = req.body;
    const address = req.body.address;
    const addressModel = new AddressModel(address);

    const token = jsonwebtoken.sign({ email, phone }, "clickmind");

    try {
      const user = new UserModel({
        email: email,
        name: name,
        password: password,
        image_url: image_url,
        phone: phone,
        address: (await addressModel.save())._id,
        token: token,
      });
      const result = await user.save(function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send({ messsage: "Data inserted", data: data });
        }
      });
      if (result) {
        console.log(`result == ${result}`);
      }
    } catch (e) {
      res.send({ error: `${e}` });
    }
  }
  async getUser(req, res) {
    try {
      const token = req.headers.authorization;
      const email = jsonwebtoken.verify(token, "clickmind");
      const user = await UserModel.findOne(email, "-__v -token -_id");
      const address = await AddressModel.findOne(user.address._id, "-__v");
      user.address = address;
      res.send({ success: true, data: user });
    } catch (e) {
      res.send({ message: `${e}` });
    }
  }
}

export default UserController;
