import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'ProductComment',
    {
      CommentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ProductName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      ProductContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      MemberID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Nickname: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      eMail: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      MemberAvatar: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      StarLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'ProductComment', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
