import Coupon from '@/components/member/coupon';
import MemberLayout from '@/components/layout/member-layout';
import Pagination from '@/components/pagination/pagination';
MyCoupon.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function MyCoupon() {
  return (
    <>
      <article className="col-md-9">
        <div className="mb-content d-flex justify-content-between">
          <h5 className="title">
            我的優惠券 <span className="text-warning">Coupon</span>
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
                未使用
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
                已使用
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
                已過期
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
            <div className="d-flex flex-wrap gap-4 pt-4">
              <Coupon /> <Coupon /> <Coupon /> <Coupon />
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
