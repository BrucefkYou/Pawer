import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'otp',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      token: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      exp_timestamp: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      tableName: 'otp', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
