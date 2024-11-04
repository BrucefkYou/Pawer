import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Image',
    {
      ImageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ProductID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ArticleID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      BlogID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      EventID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      JoininID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      PetCommID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ImageName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      ImageUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ImageUploadDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ImageType: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: 'Image', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
