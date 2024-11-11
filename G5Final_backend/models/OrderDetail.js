import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'OrderDetail', // 模型名稱，請根據您的實際情況修改
    {
      ID: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      OrderID: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        allowNull: true,
        comment: '訂單 ID',
      },
      ProductID: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        allowNull: false,
        comment: '產品 ID',
      },
      ProductName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '產品名稱',
      },
      ProductOriginPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: '產品原價',
      },
      ProductRealPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: '產品實際價格',
      },
      ProductAmount: {
        type: DataTypes.INTEGER(5),
        allowNull: true,
        comment: '產品數量',
      },
    },
    {
      tableName: 'OrderDetail',
      timestamps: false,
      paranoid: false,
      underscored: false, // 不使用蛇形命名法
    }
  )
}
