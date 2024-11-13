import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  const Payment = sequelize.define(
    'LinepayInfo',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      OrderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transaction_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      order_info: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      reservation: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      confirm: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
    },
    {
      tableName: 'LinepayInfo',
      timestamps: false,
      paranoid: false,
      underscored: false,
    }
  )

  // 如果需要定義關聯關係，請在此添加
  // Payment.associate = function (models) {
  //   Payment.belongsTo(models.Order, { foreignKey: 'OrderID' });
  // };

  return Payment
}
