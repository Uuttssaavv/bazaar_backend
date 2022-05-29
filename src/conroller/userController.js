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
    console.log(token);
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
      //
      const result = await user.save(async (err, data) => {
        if (err) {
          var errors = handleError(err);

          res.send({
            success: false,
            message: errors === null ? "Exception occured" : errors.message,
            errors: errors,
          });
        } else {
          const user = await UserModel.findOne(data, "-password -__id -__v");
          const address = await AddressModel.findOne(user.address._id, "-__v");
          user.address = address;
          res.send({
            success: true,
            messsage: "Created user successfully",
            data: user,
          });
        }
      });
    } catch (e) {
      res.send({ success: false, message: "Error" + `${e}` });
    }
  }
  async getUser(req, res) {
    try {
      const token = req.headers.authorization;
      var params = {};
      if (token) {
        params = jsonwebtoken.verify(token, "clickmind");
      } else {
        params = {
          _id: req.query.id,
        };
      }
      const user = await UserModel.findOne(params, "-__v -token");
      const address = await AddressModel.findOne(user.address._id, "-__v");
      user.address = address;
      res.send({ success: true, data: user });
    } catch (e) {
      res.send({
        success: false,
        message: "No user found for corresponding data.",
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
    console.log(params);
    try {
      const user = await UserModel.findOne(params, "-__v");
      if (user) {
        if (await user.validPassword(password)) {
          var response = await user.getAddress(user);
          res.send({ success: true, data: response });
        } else {
          throw "";
        }
      } else {
        throw "";
      }
    } catch (e) {
      res.send({
        success: false,
        message: "Invalid email or password",
      });
    }
  }
  async getAllUsers(req, res) {
    UserModel.find({}, function (err, users) {
      var userMap = {};

      users.forEach(function (user) {
        userMap[user._id] = user;
      });

      res.send({ data: userMap });
    });
  }
}
export default UserController;

function handleError(err) {
  var errors = {};
  try {
    if (err.code === 11000) {
      Object.keys(err.keyValue).forEach((key) => {
        errors[key] = `${
          key[0].toUpperCase() + key.substring(1)
        } already in use.`;
      });
      console.log("unique error");
    } else {
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
    }
    errors["message"] = "Validation Error";
  } catch (e) {
    errors = null;
  }
  return errors;
}
