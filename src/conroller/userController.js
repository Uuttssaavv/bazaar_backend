//
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import AddressModel from "../models/addressModel.js";
import bcrypt from "bcryptjs";
class UserController {
  async register(req, res) {
    const { name, email, password, image_url, phone, address } = req.body;
    const addressModel = new AddressModel(address);
    const encrpassword = await bcrypt.hash(password, 8);

    try {
      const user = new UserModel({
        email: email,
        name: name,
        password: encrpassword,
        image_url: image_url,
        phone: phone,
      });
      user.address = await addressModel.save();
      const usr = await user.save();
      const token = jsonwebtoken.sign({ _id: usr._id }, "clickmind");
      usr.token = token;
      usr.populate("address");
      if (usr) {
        usr.password = "";
        res.send({ success: true, data: usr });
      }
    } catch (e) {
      res.send({ success: false, message: "Error" + `${e}` });
    }
  }

  async login(req, res) {
    const { email, password, phone } = req.body;
    const params = {
      email: email,
    };
    if (phone) {
      delete params.email;
      params["phone"] = phone;
    }

    try {
      const user = await UserModel.findOne(params, "-__v +password").populate(
        "address"
      );
      if (user) {
        const token = jsonwebtoken.sign({ _id: user._id }, "clickmind");
        user.token = token;
        console.log(token);
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (passwordIsValid) {
          delete user.password;
          res.status(200).json({ success: true, data: user });
        } else {
          throw "password doesn't match";
        }
      } else {
        throw "invalid phone or email";
      }
    } catch (e) {
      res.status(404).json({
        success: false,
        error: "Error " + `${e}`,
        message: "Invalid email or password",
      });
    }
  }
}
export default UserController;
