const { userService } = require('../services');

const login = async (req, res) => {
  const { body } = req;
  const { type, message } = await userService.login(body);

  return res.status(type).json(message);
};

const register = async (req, res) => {
  const { body } = req;
  const { type, message } = await userService.register(body);

  return res.status(type).json(message);
};

const getUsers = async (req, res) => {
  const { role } = req.params;

  const sellers = await userService.getUsers(role);

  return res.status(200).json(sellers);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await userService.deleteUser(Number(id));

  return res.status(204).end();
};

module.exports = {
  login,
  register,
  getUsers,
  deleteUser,
};
