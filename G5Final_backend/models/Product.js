import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Product',
    {
      ID: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Valid: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        defaultValue: 1,
      },
      Brand: {
        type: DataTypes.STRING(10),
        allowNull: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
      CategoryName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
      SubCategory: {
        type: DataTypes.STRING(50),
        allowNull: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
      Img: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      OriginPrice: {
        type: DataTypes.INTEGER(5),
        allowNull: true,
      },
      SalePrice: {
        type: DataTypes.INTEGER(5),
        allowNull: true,
      },
      Status: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Stock: {
        type: DataTypes.INTEGER(10),
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
      Info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ProductSummary: {
        type: DataTypes.STRING(255),
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
      tableName: 'Product', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
