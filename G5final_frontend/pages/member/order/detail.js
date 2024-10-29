import MemberLayout from '@/components/layout/member-layout';
OrderDetail.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function OrderDetail() {
  return (
    <>
      <article className="col-md-9">
        <div className="mb-content d-flex justify-content-between">
          <h5 className="title">
            訂單查詢 <span className="text-warning">Order</span>
            <div className="underline">
              <div className="underline-part1"></div>
              <div className="underline-part2"></div>
            </div>
          </h5>
        </div>
        <div className="mb-card">
          <div className="row">
            <div className="col-md-2 col-4">
              <span className="title">訂單編號</span>
            </div>
            <div className="col-md-10 col-8 col-8">
              <span className="title">#EC24090100231</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-4">
              <span>訂單日期</span>
            </div>
            <div className="col-md-10 col-8">
              <span>2024/9/1 13:18</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-4">
              <span>付款方式</span>
            </div>
            <div className="col-md-10 col-8">
              <span>信用卡</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-4">
              <span>訂單金額</span>
            </div>
            <div className="col-md-10 col-8">
              <span>$1,433</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-4">
              <span>訂單狀態</span>
            </div>
            <div className="col-md-10 col-8 d-flex justify-content-between align-items-start">
              <span className="badge text-bg-secondary">未付款</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-end"></div>
          </div>
        </div>
        <div className="mb-card">
          <div className="row">
            <div className="col-md-2 col-4">
              <span className="title">配送資訊</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-4">
              <span>配送方式</span>
            </div>
            <div className="col-md-10 col-8">
              <span>宅配</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-4">
              <span>收貨人</span>
            </div>
            <div className="col-md-10 col-8">
              <span>林ＯＯ</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-4">
              <span>聯繫電話</span>
            </div>
            <div className="col-md-10 col-8">
              <span>$1,433</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-4">
              <span>訂單狀態</span>
            </div>
            <div className="col-md-10 col-8">
              <span>0912345678</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-4">
              <span>寄送地址</span>
            </div>
            <div className="col-md-10 col-8">
              <span>桃園市中壢區新生路二段421號</span>
            </div>
          </div>
        </div>
        <div className="mb-card">
          <div className="row">
            <div className="col-md-2 col-4">
              <span className="title">商品資訊</span>
            </div>
          </div>
          <div className="mb-order-product">
            <div className="row header">
              <div className="cell">商品</div>
              <div className="cell">單價</div>
              <div className="cell">數量</div>
              <div className="cell">總價</div>
            </div>
            <div className="row">
              <div className="cell justify-content-start  ">
                <img src="/member/order-product.jpg" alt="1" className="img" />{' '}
                貓咪痕淨白 60顆
              </div>
              <div className="cell">$700</div>
              <div className="cell">1</div>
              <div className="cell text-warning">$700</div>
            </div>
            <div className="row">
              <div className="cell justify-content-start  ">
                <img src="/member/order-product.jpg" alt="1" className="img" />{' '}
                貓咪痕淨白 60顆
              </div>
              <div className="cell">$700</div>
              <div className="cell">1</div>
              <div className="cell text-warning">$700</div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <div className="col-md-4 col-12">
              <div className="d-flex justify-content-between mt-3">
                <span>優惠券</span>
                <span>2024九月寵物保健優惠</span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span>商品合計</span>
                <span>$1593</span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span>優惠券折抵</span>
                <span>-$160</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mt-3">
                <h5 className="title">訂單總計</h5>
                <span className="title">$1,433</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
