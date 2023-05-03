const { userService } = require('../services');

const login = async (req, res) => {
  const { body } = req;
  const { type, message } = await userService.login(body);
  return res.status(type).json(message);
};

module.exports = {
  login,
};
