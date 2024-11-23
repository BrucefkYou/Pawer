import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Order',
    {
      ID: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      OrderNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      UUID: {
        type: DataTypes.STRING(36),
        allowNull: true,
        comment: '給LinePay用的UUID',
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      MemberID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ProductsAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '訂購商品品項的數量',
      },
      OriginPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '原價',
      },
      DiscountPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '折抵金額',
      },
      TotalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '結帳金額',
      },
      CouponID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      PaymentMethod: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: 'LinePay/信用卡/貨到付款',
      },
      PaymentStatus: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: '已付款/未付款',
      },
      Receiver: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      ReceiverPhone: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      DeliveryWay: {
        type: DataTypes.STRING(4),
        allowNull: false,
        comment: '超商取貨/宅配',
      },
      DeliveryAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      DeliveryStatus: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: '已出貨/未出貨/已送達',
      },
      ReceiptType: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: '捐贈發票/手機載具/紙本發票',
      },
      ReceiptCarrier: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: '只有選擇手機載具時才需要填寫',
      },
      SendEmail: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '0未寄出1已寄出',
      },
      Note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'Order', // 資料表名稱，請根據實際情況替換
      timestamps: false, // 如果不使用 Sequelize 自動添加的時間戳，設置為 false
      paranoid: false, // 如果不使用軟刪除，設置為 false
      underscored: false, // 如果欄位名稱不使用蛇形命名法，設置為 false
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
}
