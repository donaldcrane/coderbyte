import Joi from "joi";

const registerValidation = user => {
  const schema = Joi.object({
    username: Joi.string().required().alphanum().min(3)
      .max(255)
      .empty()
      .messages({
        "any.required": "Sorry, username is required",
        "string.alphanum": "Sorry, Username must contain only alphanumeric characters",
        "string.empty": "username cannot be an empty field",
        "string.min": "username should have a minimum length of 3 and a maximum length of 255"
      }),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk", "co"] } }).min(5)
      .max(100)
      .empty()
      .messages({
        "any.required": "Sorry, email is required",
        "string.empty": "Sorry, Email cannot be an empty field",
        "string.email": "Please enter a valid email",
      }),
    password: Joi.string().required().empty().min(5)
      .max(1024)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .messages({
        "any.required": "Sorry, password is required",
        "string.pattern.base": "password must contain only alphanumeric characters.",
        "string.empty": "Sorry, password cannot be an empty field",
        "string.min": "password should have a minimum length of 5"
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(user);
};
const loginValidation = user => {
  const schema = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk", "co", "io"] } }).min(5)
      .max(100)
      .empty()
      .messages({
        "any.required": "Sorry, email is required",
        "string.email": "Please enter a valid email",
        "string.empty": "Sorry, Email cannot be an empty field",
      }),
    password: Joi.string().required().min(5).max(1024)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .messages({
        "string.pattern.base": "Password must contain only alphanumeric characters.",
        "string.empty": "Sorry, password cannot be an empty field",
        "string.min": "Password should have a minimum length of 5"
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  });
  return schema.validate(user);
};

const profileValidate = profile => {
  const schema = Joi.object({
    firstName: Joi.string().max(40).empty()
      .messages({
        "string.base": "firstName must be a string",
        "string.max": "firstName cannot be above 40 characters",
        "string.empty": "Sorry, firstName cannot be an empty field"
      }),
    lastName: Joi.string().max(40).empty()
      .messages({
        "string.base": "lastName must be a string",
        "string.max": "lastName cannot be above 40 characters",
        "string.empty": "Sorry, lastName cannot be an empty field",
      }),
    gender: Joi.string().empty()
      .messages({
        "string.base": "Gender must be either Male, Female or Custom",
        "string.empty": "Sorry, gender cannot be an empty field"
      }),
    dateOfBirth: Joi.date().empty()
      .messages({
        "date.base": "D.O.B must be in this format 2002-12-03",
        "date.empty": "Sorry, D.O.B cannot be an empty field"
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(profile);
};

export {
  registerValidation,
  loginValidation,
  profileValidate
};
