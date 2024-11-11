import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'MemberFavoriteMapping',
    {
      FavoriteID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      MemberID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BlogID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ProductID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      JoininID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'MemberFavoriteMapping', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
