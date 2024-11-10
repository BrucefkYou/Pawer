import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'PetCommunicatorReserve',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      PetCommID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MemberID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ReserveName: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      Phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      PetType: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      PetName: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      Approach: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Remark: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Status: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    },
    {
      tableName: 'PetCommunicatorReserve', // 直接提供資料表名稱
      timestamps: false, // 不自動生成 createdAt 和 updatedAt
      paranoid: false, // 不啟用軟刪除
      underscored: false, // 所有自動建立欄位，使用 snake_case 命名
      createdAt: 'created_at', // 自定義建立時間戳
      updatedAt: 'updated_at', // 自定義更新時間戳
    }
  )
}
