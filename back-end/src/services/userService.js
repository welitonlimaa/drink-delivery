const md5 = require('md5');
const { Users } = require('../database/models');
const { createToken } = require('../utils/authenticator');
const { dataLoginSchema, newUserSchema } = require('./validations/schemas');

const login = async ({ email, password }) => {
  const { error } = dataLoginSchema.validate({ email, password });
  if (error) return { type: 400, message: { message: error.message } };

  const user = await Users.findOne({ where: { email } });
  const invalid = 'Invalid email or password';
  if (!user) return { type: 401, message: { message: invalid } };

  const compare = md5(password) === user.password;
  if (!compare) return { type: 401, message: { message: invalid } };

  const { name, role } = user;

  const token = createToken({ name, email, role });

  return { type: 200, message: { token } };
};

const register = async ({ name, email, password, role }) => {
  const { error } = newUserSchema.validate({ name, email, password, role });

  if (error) return { type: 400, message: { message: error.message } };

  const userVerify = await Users.findOne({ where: { email } });
  if (userVerify) return { type: 400, message: { message: 'E-mail already registered!' } };

  await Users.create({ name, email, password: md5(password), role });

  return { type: 201, message: 'Created!' };
};

module.exports = {
  login,
  register,
};