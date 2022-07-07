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
  check("new_password", "Please enter new password").notEmpty(),
];

const reporter = async (req, res, next) => {
  var errors = validationResult(req);
  const index = errors.array().findIndex((e) => e.param === "new_password");
  if (req.path === "/login") {
    errors = remove(errors.array(), errors.array()[index]);
  } else {
    errors = errors.array();
  }

  if (errors.length !== 0) {
    const errorMessages = errors.map((error) => {
      return error.nestedErrors
        ? {
            key: error.nestedErrors[0].param,
            message: error.nestedErrors[0].msg,
          }
        : { key: error.param, message: error.msg };
    });

    return res.status(400).json({
      success: false,
      errors: errorMessages,
      message: "Validation error",
    });
  } else {
    console.log("next");
    next();
  }
};
function remove(arrOriginal, elementToRemove) {
  return arrOriginal.filter(function (el) {
    return el !== elementToRemove;
  });
}
const loginMiddleware = [generateValidators(), reporter];
export default loginMiddleware;
