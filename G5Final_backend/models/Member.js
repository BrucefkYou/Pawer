import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Member',
    {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // 如果需要自動遞增
      },
      Name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Account: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      Password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Nickname: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      eMail: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Phone: {
        type: DataTypes.STRING(20),
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
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      google_uid: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      google_avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'Member', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
