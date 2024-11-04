import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Joinin',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      MemberID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      StartTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      EndTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      SignEndTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ParticipantLimit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      City: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Township: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Location: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      PositionX: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      PositionY: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },
      Status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      Valid: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      CreateDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      UpdateDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'Joinin', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
