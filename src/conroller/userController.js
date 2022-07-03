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
    addressModel.save().then(async (address) => {
      try {
        const user = new UserModel({
          email: email,
          name: name,
          password: encrpassword,
          image_url: image_url,
          phone: phone,
          address: address,
        });

        await user.save(async (err, data) => {
          const user = await UserModel.findOne(data, "-password -__v");
          const address = await AddressModel.findOne(user.address._id, "-__v");
          user.address = address;
          res.send({
            success: true,
            messsage: "Created user successfully",
            data: {
              email: user.email,
              name: user.name,
            },
          });
        });
      } catch (e) {
        res.send({ success: false, message: "Error" + `${e}` });
      }
    });
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
      const user = await UserModel.findOne(params, "-__v");
      if (user) {
        var address = await AddressModel.findOne(user.address);
        user.address = address;
        const token = jsonwebtoken.sign({ _id: user._id }, "clickmind");
        user.token = token;
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (passwordIsValid) {
          user.password = "";
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
