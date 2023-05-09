const { saleService } = require('../services');

const registerSale = async (req, res) => {
  const saleData = req.body;
  const userId = req.data.id;

  const { type, message } = await saleService.registerSale({ saleData, userId: Number(userId) });
  return res.status(type).json(message);
};

module.exports = {
  registerSale,
};