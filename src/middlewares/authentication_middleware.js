import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/userModel.js";
const authenticationMiddleware = async (req, resp, next) => {
  //
  console.log(req.baseUrl + req.path);
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw "token not provided";
    }
    var params = jsonwebtoken.verify(token.substring(6), "clickmind");
    var user = await UserModel.findOne(params);
    if (!user) {
      resp.send({ success: false, message: "Invalid authorization" });
    } else {
      req.body.user = user;
      next();
    }
  } catch (e) {
    resp.send({ success: false, message: "Invalid " + `${e}` });
  }
};
export default authenticationMiddleware;
