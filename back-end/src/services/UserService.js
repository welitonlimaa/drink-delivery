const { Users } = require('../database/models')

const getAll = () => Users.findAll({ attributes: { exclude: 'password' } })

module.exports = {
  getAll,
};