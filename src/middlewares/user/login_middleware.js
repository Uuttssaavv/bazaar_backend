import jsonwebtoken from "jsonwebtoken";
import UserModel from "../../models/userModel.js";
import { check, oneOf, validationResult } from "express-validator";
const generateValidators = () => [
  oneOf([
    check("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email can't be blank")
      .bail()
      .isEmail()
      .withMessage("Invalid email address"),
    check("phone")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Phone number can't be blank")
      .bail()
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number invalid"),
  ]),
  check("password", "Password cannot be empty").notEmpty(),
];

const reporter = async (req, res, next) => {
  const { email, phone } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) =>
        error.nestedErrors ? error.nestedErrors[0].msg : error.msg
      );

    return res.status(400).json({
      success: false,
      errors: errorMessages,
      message: "Validation error",
    });
  } else {
    next();
  }
};

const loginMiddleware = [generateValidators(), reporter];
export default loginMiddleware;
