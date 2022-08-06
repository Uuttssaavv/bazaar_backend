//
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import AddressModel from "../models/addressModel.js";
import bcrypt from "bcryptjs";
class UserController {
  async register(req, res) {
    const { name, email, password, image_url, phone, address } = req.body;
    const encrpassword = await bcrypt.hash(password, 8);

    try {
      const user = new UserModel({
        email: email,
        name: name,
        password: encrpassword,
        image_url: image_url,
        phone: phone,
      });
      if (address) {
        const addressModel = new AddressModel(address);

        user.address = await addressModel.save();
      }
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
  async changePassword(req, res) {
    const { email, password, new_password, user } = req.body;
    try {
      const encrpassword = await bcrypt.hash(new_password, 8);
      console.log(user);
      const usr = await UserModel.findOne({ _id: user._id }, "+password");
      console.log(usr.password);
      console.log(password);
      const isPasswordValid = bcrypt.compareSync(password, usr.password);
      if (isPasswordValid) {
        await UserModel.findByIdAndUpdate(user.id, { password: encrpassword });
        res.status(201).json({
          success: true,
          message: "Changed password successfully",
          user: user,
        });
      } else {
        res.status(401).send({ success: false, message: "Incorrect password" });
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Unable to change password",

        error: `Error ${error}`,
      });
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

    //sat commit
    try {
      const user = await UserModel.findOne(params, "-__v +password").populate(
        "address"
      );
      if (user) {
        const token = jsonwebtoken.sign({ _id: user._id }, "clickmind");
        user.token = token;
        console.log(token);
        const passwordIsValid = bcrypt.compareSync(password, user.password);
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
