const Joi = require('joi');

const dataLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const newUserSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

module.exports = {
  dataLoginSchema,
  newUserSchema,
};