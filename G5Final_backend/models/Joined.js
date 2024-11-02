import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Joined',
    {
      ApplyID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // 如果 ApplyID 是主鍵，這裡需要標記
      },
      JoininID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      MemberID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      RegistrationTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      CancelTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: 'Joined', //直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
