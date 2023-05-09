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

const newSaleSchema = Joi.object({
  sellerId: Joi.number().required(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  products: Joi.array().items({ productId: Joi.number(), quantity: Joi.string() }).min(1),
});

module.exports = {
  dataLoginSchema,
  newUserSchema,
  newSaleSchema,
};