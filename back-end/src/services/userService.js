const md5 = require('md5');
const { Op } = require('sequelize');
const { Users } = require('../database/models');
const { createToken } = require('../utils/authenticator');
const { dataLoginSchema, newUserSchema } = require('./validations/schemas');

const login = async ({ email, password }) => {
  const { error } = dataLoginSchema.validate({ email, password });
  if (error) return { type: 400, message: { message: error.message } };

  const user = await Users.findOne({ where: { email } });
  const invalid = 'Invalid email or password';
  if (!user) return { type: 404, message: { message: invalid } };

  const compare = md5(password) === user.password;
  if (!compare) return { type: 404, message: { message: invalid } };

  const { id, name, role } = user;

  const token = createToken({ id, name, email, role });

  return { type: 200, message: { name, email, role, token } };
};

const register = async ({ name, email, password, role }) => {
  const { error } = newUserSchema.validate({ name, email, password, role });
  if (error) return { type: 400, message: { message: error.message } };

  const userVerify = await Users.findOne({
    where: {
      [Op.or]: [
        {
          name: { [Op.like]: name },
        },
        {
          email: { [Op.like]: email },
        },
      ],
    },
  });
  if (userVerify) return { type: 409, message: { message: 'Conflict!' } };

  const user = await Users.create({ name, email, password: md5(password), role });

  const token = createToken({ id: user.id, name, email, role });
  
  return { type: 201, message: { name, email, role, token } };
};

const getUsers = async (role) => {
  let sellers = [];
  if (role) {
    sellers = await Users.findAll({ 
      where: { role },
      attributes: { exclude: ['password'] },
    });
  } else {
    sellers = await Users.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  return sellers;
};

const deleteUser = async (userId) => {
  await Users.destroy({
    where: {
      id: userId,
    },
  });
};

module.exports = {
  login,
  register,
  getUsers,
  deleteUser,
};