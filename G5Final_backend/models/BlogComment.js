import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'BlogComment',
    {
      CommentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      MemberID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CommentContent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'BlogComment', //直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
    }
  )
}
