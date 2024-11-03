import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Blog',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      StartTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      EndTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      Title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      CreateDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      CreateUserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UpdateDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      UpdateUserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Valid: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: 'Blog', //直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
