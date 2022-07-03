import UserModel from "../models/userModel.js";

const signupMiddleware = async (req, resp, next) => {
  const { email, phone } = req.body;
  const params = {
    email: email,
  };
  if (phone) {
    delete params.email;
    params["phone"] = phone;
  }
  var user = await UserModel.findOne(params);

  if (user) {
    resp.status(409).json({
      success: false,
      message: "User already exists",
    });
  } else {
    next();
  }
};
export { signupMiddleware };
