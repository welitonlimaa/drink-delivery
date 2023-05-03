const { users } = require('../database/models')

const getAll = () => users.findAll({ attributes: { exclude: 'password' } })

module.exports = {
  getAll,
};