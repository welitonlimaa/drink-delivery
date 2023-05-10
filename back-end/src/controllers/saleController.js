const { saleService } = require('../services');

const registerSale = async (req, res) => {
  const saleData = req.body;
  const userId = req.data.id;

  const { type, message } = await saleService.registerSale({ saleData, userId: Number(userId) });
  return res.status(type).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;

  console.log('teste1');

  const order = await saleService.getById(Number(id));

  return res.status(200).json(order);
};

const getAll = async (req, res) => {
  const userId = req.data.id;
  const orders = await saleService.getAll(userId);

  return res.status(200).json(orders);
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const { type, message } = await saleService.updateById(Number(id), status);

  return res.status(type).json(message);
};

module.exports = {
  registerSale,
  getById,
  getAll,
  updateById,
};