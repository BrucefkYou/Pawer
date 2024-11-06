import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Blog',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Status: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      Title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      CreateDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      MemberID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      UpdateDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Valid: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    },
    {
      tableName: 'Blog', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
