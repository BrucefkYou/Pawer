import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Member',
    {
      ID: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Account: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Nickname: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Level: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '1',
      },
      eMail: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      Tel: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      Address: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Birth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      Gender: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Valid: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
      },
      IsBlacklisted: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
      },
      CreateDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      CreateUserID: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      UpdateDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      UpdateUserID: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
    },
    {
      tableName: 'Member', //直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
