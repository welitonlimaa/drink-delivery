const bcrypt = require('bcrypt');
const { Users } = require('../database/models');
const { createToken } = require('../utils/authenticator');

const login = async ({ email, password }) => {
  const user = await Users.findOne({ where: { email } });
  const invalid = 'Invalid email or password';
  if (!user) {
    return { type: 401, message: { message: invalid } };
  }
  const compare = bcrypt.compareSync(password, user.password);

  if (!compare) {
    return { type: 401, message: { message: invalid } };
  }

  const token = createToken(user);

  return { type: 200, message: { token } };
};

module.exports = {
  login,
};