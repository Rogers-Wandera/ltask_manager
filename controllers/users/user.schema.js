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

const LoginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.base": "Email is required and should be a string",
    "any.required": "Email is required",
    "string.email": "Email should be a valid email",
  }),
  password: joi
    .string()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[a-zA-Z\d]).{6,}$/))
    .required()
    .messages({
      "string.base": "Password is required and should be a string",
      "any.required": "Password is required",
      "string.pattern.base":
        "Password should be at least 6 characters long and should contain a number and a lowercase letter",
    }),
});

module.exports = { CreateUserSchema, LoginSchema };
