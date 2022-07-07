import jsonwebtoken from "jsonwebtoken";
import UserModel from "../../models/userModel.js";
import { check, validationResult } from "express-validator";
const generateValidators = () => [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User name can't be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!"),
  // check("address").not().isEmpty().withMessage("Address is required"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email can't be blank")
    .bail()
    .isEmail()
    .withMessage("Invalid email address"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password can't be blank")
    .bail()
    .isLength({ min: 8, max: 24 })
    .withMessage("Password must be of length 8-24 characters")
    .bail()
    .isStrongPassword()
    .withMessage("Password must contain A-Z,a-z,0-9 and special character"),
  check("phone")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Phone number can't be blank")
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number invalid"),
];

const reporter = async (req, res, next) => {
  const { email, phone } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => {
        return { key: error.param, message: error.msg };
      });

      return res.status(400).json({
        success: false,
        errors: errorMessages,
      });
    } else {
      var userWithEmail = await UserModel.findOne({ email: email });
      var userWithPhone = await UserModel.findOne({ phone: phone });
      if (userWithEmail || userWithPhone) {
        throw "";
      } else {
        next();
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "User already exist with corresponding email or phone",
    });
  }
};

const signupMiddleware = [generateValidators(), reporter];
export default signupMiddleware;
