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
        allowNull: false,
      },
      MemberID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ReserveName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      Phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      PetType: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      PetName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      Approach: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Remark: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Status: {
        type: DataTypes.TINYINT,
        allowNull: false,
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
