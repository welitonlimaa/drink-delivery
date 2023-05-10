/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    'Sales',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      tableName: 'sales',
      underscored: true,
      timestamps: false,
    },
  );
  Sales.associate = (models) => {
    Sales.hasMany(models.SalesProducts, {
      foreignKey: 'sale_id',
      as: 'sale',
    });
    Sales.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'customer',
    });
    Sales.belongsTo(models.Users, {
      foreignKey: 'seller_id',
      as: 'seller',
    });
  };
  return Sales;
};