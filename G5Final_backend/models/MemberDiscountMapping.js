import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'MemberDiscountMapping', // 模型名称，可以根据需要修改
    {
      MemberDiscountMappingID: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      DiscountID: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      MemberID: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      Received_Date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Used_Date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Status: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
      },
    },
    {
      tableName: 'MemberDiscountMapping',
      timestamps: false,
      paranoid: false, // 不使用軟删除
      underscored: false, // 不使用蛇形命名法
    }
  )
}
