const { Products } = require('../database/models');

const getAll = async () => {
  const products = await Products.findAll();

  return products;
};

module.exports = {
  getAll,
};