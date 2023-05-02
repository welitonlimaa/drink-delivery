/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    'SalesProducts',
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'sales_products',
      underscored: true,
    },
  );
  SalesProducts.associate = ({ Sales, Products }) => {
    Sales.belongsToMany(Products, {
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: SalesProducts,
      as: 'product',
    });
    Products.belongsToMany(Sales, {
      foreignKey: 'productId',
      otherKey: 'saleId',
      through: SalesProducts,
      as: 'sale',
    });
  };
  return SalesProducts;
};