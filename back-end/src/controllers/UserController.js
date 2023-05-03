const { UserService } = require('../services');

const getAll = async (req, res) => {
  const users = await UserService.getAll();
  return res.status(200).json(users);
};

module.exports = {
  getAll,
};

