/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      tableName: 'users',
      underscored: true,
      timestamps: false,
    },
  );
  Users.associate = (models) => {
    Users.hasMany(models.Sales, {
      foreignKey: 'user_id',
      as: 'saleUser',
    });
    Users.hasMany(models.Sales, {
      foreignKey: 'seller_id',
      as: 'saleSeller',
    });
  };
  return Users;
};