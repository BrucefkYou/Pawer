import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Discount',
    {
      ID: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      StartTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      EndTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      PromotionCondition: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      ConditionMinValue: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null,
      },
      CalculateType: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      Value: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      IsCumulative: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: null,
      },
      MemberLevel: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      PromotionType: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      ProductCategory: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: null,
      },
      CouponSerial: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      CouponInfo: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      CouponReceiveEndTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      CouponUseMax: {
        type: DataTypes.INTEGER(5),
        allowNull: true,
        defaultValue: null,
      },
      EnableStatus: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      IsValid: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      CreateDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      CreateUserID: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      UpdateDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      UpdateUserID: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    },
    {
      tableName: 'Discount', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
