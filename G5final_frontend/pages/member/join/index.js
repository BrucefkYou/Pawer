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
                已報名
                <span className="tab-count">10</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="mb-card d-flex flex-wrap gap-4"></div>
      </article>
    </>
  );
}
