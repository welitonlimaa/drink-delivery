/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      urlImage: DataTypes.STRING,
    },
    {
      tableName: 'products',
      underscored: true,
      timestamps: false,
    },
  );
  Products.associate = (models) => {
    Products.hasMany(models.SalesProducts, {
      foreignKey: 'product_id',
      as: 'saleProduct',
    });
  };
  return Products;
};