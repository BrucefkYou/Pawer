import Pagination from '@/components/pagination/pagination';
import Link from 'next/link';
import MemberLayout from '@/components/layout/member-layout';
Order.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Order() {
  return (
    <>
      {/* sidebar已經寫在MemberLayout裡了，可直接寫右邊的內容(article內) */}
      <article className="col-md-9">
        <div className="mb-content d-flex justify-content-between">
          <h5 className="title">
            訂單查詢 <span className="text-warning">Order</span>
            <div className="underline">
              <div className="underline-part1"></div>
              <div className="underline-part2"></div>
            </div>
          </h5>
          <ul
            className="nav nav-tabs member-nav-tabs"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                進行中
                <span className="tab-count">10</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                歷史
                <span className="tab-count">10</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="mb-card">
              <div className="row">
                <div className="col-md-2">
                  <span className="title">訂單編號</span>
                </div>
                <div className="col-md-10">
                  <span className="title">#EC24090100231</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <span>訂單日期</span>
                </div>
                <div className="col-md-10">
                  <span>2024/9/1 13:18</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <span>訂單金額</span>
                </div>
                <div className="col-md-10">
                  <span>$1,433</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <span>訂單狀態</span>
                </div>
                <div className="col-md-10 d-flex justify-content-between align-items-start">
                  <span className="badge text-bg-secondary">未付款</span>
                  <Link href={`order/detail`}>
                    <button type="button" className="btn btn-primary">
                      訂單詳情
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-end"></div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
              <Pagination />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
          ></div>
        </div>
      </article>
    </>
  );
}
