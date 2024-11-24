import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'PetCommunicator',
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
      Name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      RealName: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      valid: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
      },
      Sex: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: true,
      },
      Img: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Certificateid: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      CertificateDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      Service: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Approach: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Fee: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Email: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Introduction: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Status: {
        type: DataTypes.ENUM('已刊登', '未刊登'),
        allowNull: true,
      },
      CreateUserID: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      CreateDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      UpdateUserID: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      UpdateDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      delreason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      PetCommCertificateImg: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: 'PetCommunicator', // 直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: false, // 所有自動建立欄位，使用 snake_case 命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
