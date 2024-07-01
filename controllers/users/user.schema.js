const joi = require("joi");

const CreateUserSchema = joi.object({
  firstName: joi.string().required().min(3).max(30).messages({
    "string.base": "First name must be a string",
    "string.min": "First name must be at least 3 characters long",
    "string.max": "First name must be at most 30 characters long",
    "any.required": "First name is required",
  }),
  lastName: joi.string().required().min(3).max(30),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[a-zA-Z\d]).{6,}$/))
    .required(),
  confirmPassword: joi.valid(joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "any.required": "Password confirmation is required",
  }),
});

module.exports = { CreateUserSchema };
